steal(
	'can/construct/super'
,	'can/model/list'
,	'can/observe'
,	'can/model'
,	'jquery/model'
,	'sigma/lib'
,	'sigma/util'
,	'sigma/lib/parseuri.js'
,	'sigma/models/base.js'
,	'sigma/models/links.js'
).then(
	function()
	{
		can.ajaxSetup(
			{
				crossDomain: true
			,	xhrFields:
				{
					withCredentials: true
				}
			}
		)

		can.Model(
			'Sigma.Model.HAL.Collection'
		,	{
				model: function(data)
				{
					data.id
					=	parseUri(data._links.self.href).path.replace(/\//g,'_')

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
					,	embedded_model
					=	undefined
					,	self
					=	this

					instance.links
					=	new	Sigma.Model.HAL.Links(links,instance)
					
					instance.embedded
					=	new can.Observe()

					can.each(
						embedded
					,	function(embedded_data,relation)
						{
							if	(!can.isEmptyResource(embedded_data))
							{
								embedded_model
								=	Sigma.Model.HAL.model_by_rel(relation)
								||	Sigma.Model.HAL.Resource

								
								if	(_.isEqual(relation,'collection'))	{
									_.each(
										embedded_data
									,	function(d)
										{
											d.rel
											=	self.parentModel().toLowerCase().replace(/(\s+)?.$/, '')
										}
									)
								}	else
									embedded_data.rel
									=	relation

								instance.embedded.attr(
									relation
								,	_.isEqual(relation,'collection')
									?	Sigma.Model.HAL.model_by_rel(self.parentModel()).models(embedded_data)
									:	can.isResource(embedded)
										?	embedded_model.model(embedded_data)
										:	embedded_model.Collection.model(embedded_data)
								)

							}
						}
					)

					return	instance
				}
			,	parentModel: function()
				{
					// Arma el String
					// Ejemplo: Si es Sigma.Model.HAL.Resource.Collection -> Sigma.Model.HAL.Resource
					// return	_.initial(this.fullName.split('.'),1).toString().replace(/,/g,'.')
					// Lo cambie por el anteultimo elemento
					// Ejemplo: Si es Sigma.Model.HAL.Resource.Collection -> Resource
					return	_.last(_.initial(this.fullName.split('.'),1))
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
			,	Fetch: function(url,rel)
				{
					return	this.request( url, 'GET', {}, rel)
				}
			,	Update: function(url,data,rel)
				{
					return	this.request( url, 'PUT', {}, rel)
				}
			,	Find: function(url,data,rel)
				{
					return	this.request( url, 'POST', { action: 'findOneBy', query: data }, rel)
				}
			,	Filter: function(url,data,rel)
				{
					return	this.request( url, 'POST', { action: 'findAllBy', query: data }, rel)
				}
			,	Create: function(url,data,rel)
				{
					return	this.request( url, 'POST', { action: 'create', query: data }, rel)
				}
			,	Delete: function(url,rel)
				{
					return	this.request( url, 'DELETE', {}, rel)
				}
			}
		,	{
				getHref:function()
				{
					return	this.links.attr('self.href')
				}
			,	getResourceURL: function()
				{
					return	Sigma.Model.HAL.simplify_url(this.getHref())
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

		can.Model(
			'Sigma.Model.HAL.Resource'
		,	{
				setup: function(constructor,prototype,static)
				{
					Sigma.Model.HAL.Collection(
						this.fullName+'.Collection'
					,	{ }
					,	{ }
					)
					return	this._super(constructor,prototype,static)
				}	
			,	model: function(data)
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
					,	embedded_model
					=	undefined

					instance.links
					=	new	Sigma.Model.HAL.Links(links,instance)
					
					instance.embedded
					=	new can.Observe()

					can.each(
						embedded
					,	function(embedded_data,relation)
						{
							if	(!can.isEmptyResource(embedded_data))
							{
								embedded_model
								=	Sigma.Model.HAL.model_by_rel(relation)
								||	Sigma.Model.HAL.Resource

								embedded_data.rel
								=	relation
								
								instance.embedded.attr(
									relation
								,	can.isResource(embedded_data)
									?	embedded_model.model(embedded_data)
									:	embedded_model.Collection.model(embedded_data)
								)
							}
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
							).then(
								function(resolved)
								{
									resolved.rel
									=	rel
									||	'root'

									return	can.isResource(resolved)
											?	self.model(resolved)
											:	self.Collection.model(resolved)
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
			,	Fetch: function(url,rel)
				{
					return	this.request( url, 'GET', {}, rel)
				}
			,	Update: function(url,data,rel)
				{
					return	this.request( url, 'PUT', data, rel)
				}
			,	Find: function(url,data,rel)
				{
					return	this.request( url, 'POST', { action: 'findOneBy', query: data }, rel)
				}
			,	Filter: function(url,data,rel)
				{
					return	this.request( url, 'POST', { action: 'findAllBy', query: data }, rel)
				}
			,	Create: function(url,data,rel)
				{
					return	this.request( url, 'POST', { action: 'create', query: data }, rel)
				}
			,	Delete: function(url,rel)
				{
					return	this.request( url, 'DELETE', {}, rel)
				}
			}
		,	{
				getHref:function()
				{
					return	this.links.attr('self.href')
				}
			,	getResourceURL: function()
				{
					return	Sigma.Model.HAL.simplify_url(_.initial(this.getHref().split('/'),1).join('/'))
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
			,	create: function(url,data,rel)
				{
					var self
					=	this
					return 	this.constructor.create(url,data,rel)
							.pipe(
								function(resource)
								{
									self.addItem(resource)
								}
							)
				}
			,	addItem:function(resource)
				{
					return	can.isCollection(this)
						||	this.embedded.attr('collection').push(resource)
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
	}
)