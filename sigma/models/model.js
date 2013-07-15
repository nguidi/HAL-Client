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
						model_by_rel: function(rel)
						{
							return	this[can.capitalize(can.camelCase(rel))]
						}
					,	link_by_type: function(type)
						{
							return	this[can.capitalize(can.camelCase(type))]
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
					return	_.isEqual(this.attr('templated'),true)
							?	uritemplate(this.attr('href')).expand(this.parent.resource.attr())
							:	this.attr('href')
				}
			,	resolve: function()
				{
					return	this.get()
				}
			,	get: function()
				{
					return	_.isDefined(this.parent)
							?	this.parent.get(this.rel,this.attr('this.name'))
							:	_.isDefined(this.rel)
								?	Sigma.Model.HAL.model_by_rel(this.rel).get(this.attr('href'),this.rel)
								:	Sigma.Model.HAL.Resource.get(this.attr('href'))
				}
			,	title: function()
				{
					return	this.attr('title')
				}
			,	href: function()
				{
					return	this.attr('href')
				}
			,	hreflang: function()
				{
					return	this.attr('hreflang')
				}
			,	templated: function()
				{
					return	this.attr('templated')
						||	false
				}
			,	name: function()
				{
					return	this.attr('name')
						||	this.rel.split(':')[1]
				}
			,	class: function()
				{
					return	this.rel.replace(':','_')
				}
			,	method: function()
				{
					return	'GET'
			}	}
		)

		Sigma.Model.HAL.Link(
			'Sigma.Model.HAL.Curies.Link'
		,	{
				method: function()
				{
					return undefined
				}
			}
		)

		Sigma.Model.HAL.Link(
			'Sigma.Model.HAL.Relation.Link'
		,	{
				url: function()
				{
					return 	this.attr('href')
				}
			}
		)

		Sigma.Model.HAL.Relation.Link(
			'Sigma.Model.HAL.Show.Link'
		,	{
				method: function()
				{
					return 'GET'
				}
			,	resolve: function()
				{
					return	this.parent.fetch(this.url(),this.rel)
				}
			}
		)

		Sigma.Model.HAL.Relation.Link(
			'Sigma.Model.HAL.List.Link'
		,	{
				method: function()
				{
					return 'GET'
				}
			,	resolve: function()
				{
					return	this.parent.fetch(this.url(),this.rel)
				}
			}
		)

		Sigma.Model.HAL.Relation.Link(
			'Sigma.Model.HAL.Find.Link'
		,	{
				method: function()
				{
					return 'POST'
				}
			,	resolve: function(data)
				{
					return	this.parent.find(this.url(),data,this.rel)
				}
			}
		)

		Sigma.Model.HAL.Relation.Link(
			'Sigma.Model.HAL.Filter.Link'
		,	{
				method: function()
				{
					return 'POST'
				}
			,	resolve: function(data)
				{
					return	this.parent.filter(this.url(),data,this.rel)
				}
			}
		)

		Sigma.Model.HAL.Relation.Link(
			'Sigma.Model.HAL.Create.Link'
		,	{
				method: function()
				{
					return 'POST'
				}
			,	resolve: function(data)
				{
					return	this.parent.create(this.url(),data,this.rel)
				}
			}
		)

		Sigma.Model.HAL.Relation.Link(
			'Sigma.Model.HAL.Update.Link'
		,	{
				method: function()
				{
					return 'PUT'
				}
			,	resolve: function(data)
				{
					return	this.parent.update(this.url(),data,this.rel)
				}
			}
		)

		Sigma.Model.HAL.Relation.Link(
			'Sigma.Model.HAL.Delete.Link'
		,	{
				method: function()
				{
					return 'DELETE'
				}
			,	resolve: function()
				{
					return	this.parent.delete(this.url(),this.rel)
				}
			}
		)

		Sigma.Model.HAL.Link(
			'Sigma.Model.HAL.Api.Link'
		,	{
				method: function()
				{
					return 'POST'
				}
			,	resolve: function(data)
				{
					return	this.parent.find(this.url(),data,this.rel)
				}
			,	url: function()
				{
					var	relation
					=	this.curie
					return	uritemplate(
								_.find(
									this.parent.curies.attr()
								,	function(curie)
									{
										return	curie.name	==	_.first(relation.split(':'))
									}
								).href
							).expand(
								{
									api_action: this.attr('href').split('/')[1] 
								}
							)
				}
			}
		)

		can.Observe.List(
			'Sigma.Model.HAL.Link.List'
		,	{
				setup: function(data)
				{
					this.
						_super(
							can.map(
								data
							,	function(item,index)
								{
									return	item
												.attr(
													'name'
												,	item.attr('name')
												||	index
												)
								}
							)
						)
				}
			,	getAll: function()
				{
					return	can.map(
								this
							,	function(item)
								{
									return item
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
									?	new Sigma.Model.HAL.Link.List(
												_.map(
													link
												,	function(item)
													{
														return	new (
																		Sigma.Model.HAL.link_by_type(_.first(relation.split(':')))
																	||	Sigma.Model.HAL
																	).Link(item)
																		.attr('rel',_.last(relation.split(':')))
																		.attr('curie',_.first(relation.split(':')))
													}
												)
											)
									:	new (
												Sigma.Model.HAL.link_by_type(_.first(relation.split(':')))
											||	Sigma.Model.HAL
											).Link(link)
												.attr('rel',_.last(relation.split(':')))
												.attr('curie',_.first(relation.split(':')))
								)
							self[relation].parent
							=	self
						}
					)
				}
			,	get_link_by_rel: function(relation)
				{
					var	res
					=	undefined

					can.each(
						this
					,	function(it, ind){
							if(it && it.rel == relation)
								res = it
						}
					)
					return	res
				}
			,	get:function(relation,name)
				{
					var	stored
					=	this.resource.constructor.store[this.resource.id]
					
					if	(_.isEqual(relation,"self"))
						return	stored
					
					return	Sigma.Model.HAL.lookup((stored && stored.embedded) || this.resource.embedded,relation,name)
				}
			,	resource_by_rel: function(rel)
				{
					return	(
							_.isEqual(rel,"self")
							?	this.resource.constructor
							:	(
									Sigma.Model.HAL.model_by_rel(rel)
								||	Sigma.Model.HAL.Resource
								)
						)
				}
			,	fetch: function(url,rel)
				{
					return 	this.resource_by_rel(rel).fetch(url,rel)
				}
			,	find: function(url,data,rel)
				{
					return	this.resource_by_rel(rel).find(url,data,rel)
				}
			,	filter: function(url,data,rel)
				{
					return	this.resource_by_rel(rel).filter(url,data,rel)
				}
			,	update: function(data)
				{
					return	this.resource_by_rel(rel).update(url,data,rel)
				}
			,	delete: function(url,rel)
				{
					return	this.resource_by_rel(rel).delete(url,rel)
				}
			,	join: function(url,data,rel)
				{
					return	this.resource_by_rel(rel).join(url,data,rel)
				}
			,	create: function(url,data,rel)
				{
					return	this.resource_by_rel(rel).create(url,data,rel)
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
					=	new 	can.Observe()

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

							embedded_data.rel
							=	relation

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
									url: 	can.fixture.on
											?	'/'+url
											:	url
								,	type: 	type
								,	data:	data
								}
							).then(
								function(resolved)
								{
									resolved.rel
									=	( rel == undefined)
										?	'root'
										:	rel
									return self.model(resolved)
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
			,	find: function(url,data,rel)
				{
					return	this.request( url, 'POST', { action: 'find', query: data }, rel)
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
			,	getSelf : function()
				{
					return	this.links.attr('self')
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
					var	self
					=	this
					return	new can.Observe.List(
									_.flatten(
										_.map(
											this.links.attr()
										,	function(val,key)
											{
												return	self.links.attr(key) instanceof Sigma.Model.HAL.Link.List
														?	self.links.attr(key).getAll()
														:	self.links.attr(key)
											}
										)
									)
							)
				}
			,	getEmbeddedAsList: function()
				{
					var	self
					=	this
					return	new can.Observe.List(
									_.map(
										this.embedded.attr()
									,	function(val,key)
										{
											return self.embedded.attr(key)
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
						return	can
									.trim(
										JSON
											.stringify(
												this.getProperties()
											,	true
											,	4
											)
									)
					}
			,	getResourceJSON: function()
					{
						return	can
									.trim(
										JSON
											.stringify(
												_.extend(
													this.attr()
												,	_.extend(
														{
															_links: this.links.attr()
														}
													,	_.isEmpty(this.embedded.attr())
														?	{}
														:	{
																_embedded: this.embedded.attr()
															}	
													)
												)
											,	null
											,	4
											)
									)
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
					data.id
					=	(
							data.id
						||	parseUri(data._links.self.href).path.replace(/\//g,'_')
						)

					var	instance
					=	this._super(data)
					,	embedded_model_type
					=	undefined
					,	shortName
					=	(instance.constructor.shortName == 'Collection')
						?	'Resource'
						:	String(_.initial(instance.constructor.shortName,1)).replace(/,/g,'')
					

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

					return	can.ajax(
								{
									url: 	url
								,	type: 	type
								,	data:	data 	
								}
							)
							.then(
								function(resolved)
								{
									resolved.rel
									=	( rel == undefined)
										?	'root'
										:	rel
									return self.model(resolved)
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
			,	find: function(url,data,rel)
				{
					return	this.request( url, 'POST', { action: 'find', query: data }, rel)
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
