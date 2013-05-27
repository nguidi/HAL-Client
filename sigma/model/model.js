steal(
	'can/construct/super'
,	'can/model/list'
,	'can/observe/attributes'
,	'can/model'
,	'jquery/model'
,	'sigma/lib'
,	'sigma/util'
,	'sigma/lib/uritemplates.js'
,	'sigma/lib/parseuri.js'
).then(
	function()
	{
		Sigma.Model.HAL
		=	new	can.Observe(
					{
						model_by_rel:	function(rel)
						{
							return	this[can.capitalize(can.camelCase(rel))]
						}
					,	lookup:	function(what,relation,index_or_name)
						{
							return 	_.isUndefined(index_or_name) || !_.isArray(what[relation])
									?	what[relation]
									:	can.isNumeric(index_or_name)
											?	what[relation][index_or_name]
											:	_.find(
													what[relation]
												,	function(item)
													{
														return item.name == index_or_name
													}
												)
						}
					}
				)

		can.Observe(
			'Sigma.Model.HAL.Link'
		,	{
				url: function()
				{
					return	uritemplate(this.href).expand(this.parent.resource.attr())
				}
			,	get: function()
				{
					return	this.parent.get(this.rel,this.name)
				}
			,	fetch: function()
				{
					return	this.parent.fetch(this.rel,this.name)	
				}
			}
		)

		can.Observe.List(
			'Sigma.Model.HAL.Link.List'
		,	{
				setup: function(data)
				{
					this._super(data)
					can.map(
						this
					,	function(item,index)
						{
							return	_.extend(
										item
									,	{
											index:	index
										,	name:	item.name	||	index
										}
									)
						}
					)
				}
			,	find: function(name)
				{
					return	_.find(
								this
							,	function(link)
								{
									return	link.name == name
								}
							)
				}
			,	get: function(name)
				{
					return	this.parent.fetch(this.find(name).href,name)
				}
			}
		)

		can.Model(
			'Sigma.Model.HAL.Links'
		,	{
				setup: function(data,resource)
				{
					this._super()
					var	self
					=	this
					this.resource
					=	resource
					can.each(
						data
					,	function(link,relation)
						{
							link.rel
							=	relation
							self.attr(
									relation
								,	can.isArray(link)
									?	new Sigma.Model.HAL.Link.List(link)
									:	new Sigma.Model.HAL.Link(link)
								)
							self[relation].parent
							=	self
						}
					)
					console.log(this)
				}
			,	get:function(relation,name)
				{
					var	stored
					=	this.resource.constructor.store[this.resource.id]
					,	lookedup
					=	Sigma.Model.HAL.lookup((stored && stored.embedded) || this.resource.embedded,relation,name)
					return	_.isUndefined(lookedup)
							?	Sigma.Model.HAL.lookup(this.resource.links,relation,name).fetch(relation,name)
							:	lookedup
				}
			,	fetch: function(rel,name)
				{
					return this.resource.linked(rel,name)
				}
			,	update: function(data)
				{
					console.log("GONNA UPDATE",this.href,"WITH ",data)
				}
			,	delete: function()
				{
					console.log("GONNA DELETE",this.href)
				}
			,	join: function(data)
				{
					console.log("GONNA JOIN",this.href,"WITH",data)
				}
			,	create: function(data)
				{
					console.log("GONNA CREATE",data)
				}
			}
		)

		can.Model(
			'Sigma.Model.HAL.Resource'
		,	{
				model: function(data)
				{
					var	links
					=	data._links
					,	embedded
					=	data._embedded

					can.each(
						['_links','_embedded']
					,	function(what)
						{
							delete data[what]
						}
					)

					var	instance
					=	this._super(data)
					,	embedded_model_type
					=	undefined

					instance.id
					=	(
							data.id
						||	parseUri(links.self.href).path.replace(/\//g,'_')
						)

					instance.links
					=	new	Sigma.Model.HAL.Links(links,instance)
					
					instance.embedded
					=	new can.Observe()

					can.each(
						embedded
					,	function(embedded_data,relation)
						{
							embedded_model_type
							=	(Sigma.Model.HAL.model_by_rel(relation))
								?	Sigma.Model.HAL.model_by_rel(relation)
								:	(
										_.has(embedded_data,'_embedded')
									&&	_.has(embedded_data._embedded,'collection')
									)	?	Sigma.Model.HAL.Collection
										:	Sigma.Model.HAL.Resource
							
							instance.embedded.attr(
								relation
							,	embedded_model_type
									.model(embedded_data)
							)
						}
					)

					return instance
				}
			,	request: function(url, type, data, rel)
				{
					var	self
					=	this
					return	can.ajax(
								{
									url: 	url
								,	type: 	type
								}
							).then(
								function(data)
								{
									data.rel
									=	( rel == undefined)
										?	'root'
										:	rel
									return self.model(data)
								}
							)
				}
			,	get: function(url,rel)
				{
					var cached
					=	_.find(
							this.store
						,	function(stored)
							{
								return	stored.links.attr('self').attr('href') == url
							}
						)
					return	cached
						||	this.fetch(url,rel)
				}
			,	fetch: function(url,rel)
				{
					return	this.request( url, 'GET', {}, rel)
				}
			,	update: function(url,data,rel)
				{
					return	this.request( url, 'PUT', {}, rel)
				}
			,	join: function(url,data,rel)
				{
					return	this.request( url, 'POST', { action: 'join', associations: data }, rel)
				}
			,	filter: function(url,data,rel)
				{
					return	this.request( url, 'POST', { action: 'filter', query: data }, rel)
				}
			,	create: function(url,data,rel)
				{
					return	this.request( url, 'POST', { action: 'create', query: data }, rel)
				}
			,	delete: function(url,rel)
				{
					return	this.request( url, 'DELETE', {}, rel)
				}
			}
		,	{
				getHref:function()
				{
					return	uritemplate(this.links.attr('self.href')).expand(this.attr())
				}
			,	linked: function(relation,name)
				{
					return	Sigma.Model.HAL.lookup(this.links,relation,name)
							?	(Sigma.Model.HAL.model_by_rel(relation)||Sigma.Model.HAL.Resource)
									.fetch(Sigma.Model.HAL.lookup(this.links,relation,name).url())
							:	can.Deferred.reject(
									'invalid relation: "' + relation + '"'
								)
				}
			,	getLinks: function()
				{
					return	this.links
				}
			,	getEmbedded: function()
				{
					return	this.embedded
				}
			,	getLinksAsList: function()
				{
					return	new can.Observe.List(
									_.map(
										this.links.attr()
									,	function(val,key)
										{
											return val
										}
									)
							)
				}
			,	getEmbeddedAsList: function()
				{
					return	new can.Observe.List(
									_.map(
										this.embedded.attr()
									,	function(val,key)
										{
											return val
										}
									)
							)
				}
			,	getProperties:function()
				{
					return	this.attr()
				}
			,	getPropertiesJSON: function()
					{	
						return	can.trim(JSON.stringify(this.getProperties(),true,4))
					}
			,	getResourceJSON: function()
					{
						return	can.trim(JSON.stringify(_.extend(this.attr(),{_embedded: this.embedded.attr(), _links: this.links.attr()}),null,4))
					}
			}
		)

		Sigma.Model.HAL.Resource.List(
			'Sigma.Model.HAL.Resource.List'
		,	{}
		,	{}
		)

		can.Model(
			'Sigma.Model.HAL.Collection'
		,	{
				model: function(data)
				{
					var	instance
					=	this._super(data)
					,	embedded_model_type
					=	undefined
					,	shortName
					=	(instance.constructor.shortName == 'Collection')
						?	'Resource'
						:	String(_.initial(instance.constructor.shortName,1)).replace(/,/g,'')
					
					instance.id
					=	(
							data.id
						||	parseUri(data._links.self.href).path.replace(/\//g,'_')
						)

					instance.links
					=	new	Sigma.Model.HAL.Links(data._links,instance)

					instance.embedded
					=	new can.Observe()

					instance.embedded.attr(
						'collection'
					,	(
							Sigma.Model.HAL.model_by_rel(shortName)
						||	Sigma.Model.HAL.Resource
						).models(
							data._embedded.collection
						)
					)

					can.each(
						['_links','_embedded']
					,	function(what)
						{
							delete instance[what]
						}
					)

					return instance
				}
			,	request: function(url, type, data, rel)
				{
					var	self
					=	this
					d = this
					return	can.ajax(
								{
									url: 	url
								,	type: 	type
								}
							)
							.then(
								function(data)
								{
									data.rel
									=	( rel == undefined)
										?	'root'
										:	rel
									return self.model(data)
								}
							)
				}
			,	fetch: function(url,rel)
				{
					return	this.request( url, 'GET', {}, rel)
				}
			,	update: function(url,data,rel)
				{
					return	this.request( url, 'PUT', {}, rel)
				}
			,	join: function(url,data,rel)
				{
					return	this.request( url, 'POST', { action: 'join', associations: data }, rel)
				}
			,	filter: function(url,data,rel)
				{
					return	this.request( url, 'POST', { action: 'filter', query: data }, rel)
				}
			,	create: function(url,data,rel)
				{
					return	this.request( url, 'POST', { action: 'create', query: data }, rel)
				}
			,	delete: function(url,rel)
				{
					return	this.request( url, 'DELETE', {}, rel)
				}
			}
		,	{
				getHref:function()
				{
					return	uritemplate(this.links.attr('self.href')).expand(this.attr())
				}
			,	linked: function(relation,name)
				{
					var	cached
					=	this.links.get(relation,name)
					return	(cached)
							?	can.Deferred().resolve(cached)
							: 	Sigma.Model.HAL.lookup(this.links,relation,name)
								?	(Sigma.Model.HAL.model_by_rel(relation)||Sigma.Model.HAL.Resource)
										.Fetch(Sigma.Model.HAL.lookup(this.links,relation,name).url())
								:	can.Deferred.reject(
										'invalid relation: "' + relation + '"'
									)
				}
			,	getCollection:function()
				{
					return	this.embedded.attr('collection')
				}
			,	getMore:function()
				{
					return 	this.links.attr('more')
				}
			,	getPrev:function()
				{
					return 	this.links.attr('prev')
				}
			,	getNext:function()
				{
					return 	this.links.attr('next')
				}
			}
		)
	}
)
