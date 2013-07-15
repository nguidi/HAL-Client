steal(
	'can/construct/super'
,	'can/observe'
,	'can/model'
,	'jquery/model'
,	'sigma/lib'
,	'sigma/util'
,	'sigma/lib/uritemplates.js'
).then(
	function()
	{
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
			'Sigma.Model.HAL.Collection.Link'
		,	{
				resolve: function()
				{
					return	this.parent.resource.constructor.fetch(this.url(),this.rel)
				}
			}
		)

		Sigma.Model.HAL.Collection.Link(
			'Sigma.Model.HAL.Next.Link'
		,	{}
		)

		Sigma.Model.HAL.Collection.Link(
			'Sigma.Model.HAL.Prev.Link'
		,	{}
		)

		Sigma.Model.HAL.Collection.Link(
			'Sigma.Model.HAL.More.Link'
		,	{}
		)

		Sigma.Model.HAL.Collection.Link(
			'Sigma.Model.HAL.Goto.Link'
		,	{}
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
					return 	uritemplate(
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
					/*console.log(this._super())
					return	this.parent.fetch(this.url(),this.rel)*/
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
			,	resolve: function(data,rel)
				{
					return	this.parent.find(this.url(),data,rel || this.rel)
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
	}
)