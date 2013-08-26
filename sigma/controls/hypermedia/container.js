steal(
	'sigma/lib'
,	'sigma/util'
,	'sigma/models'
).then(
	function()
	{
		can.Control(
			'Sigma.HypermediaContainer'
		,	{
				defaults:
				{
					resource: undefined
				,	slot: false
				,	render:
					{
						loading: 'sigma/views/hypermedia/loading.mustache'
					,	empty: 'sigma/views/hypermedia/empty.mustache'
					,	fail: 'sigma/views/hypermedia/fail.mustache'
					}
				,	media_types:{}
				,	default_media_type:
					{
						Handler:Sigma.HypermediaControl
					}
				}
			,	containers:{}
			,	findContainer:function(container_id)
				{
				return	this.containers[can.capitalize(container_id)]
				}
			,	registerContainer:function(container)
				{
					if(this.containers[container.options.id])
						throw can.sub('Container "{id}" already registered',container.options)
					this.containers[container.options.id]=container
				}
			}
		,	{
				init:	function(el,options)
				{
					//console.log("arguments", arguments)
					can.each(
						this.options.render
					,	this.proxy(
							function(val,what)
							{
								if (val)
									this.options.render[what]=steal.idToUri(val).path
							}
						)
					)
					if(!options.id)
						throw 'Container must have an "id" property'
					this.constructor.registerContainer(this)
					this.update(options)

				}
			,	update:	function(handler_options)
				{
					var	resource=this.options.slot
					if(resource && resource.isComputed)
						resource=resource()
					this._update(resource,handler_options)
				}
			,	_update:function(resource,handler_options)
				{
					var self
					=	this
					console.log("container",resource)
					this.element.html(can.view(this.options.render.loading))
					if(can.isDeferred(resource))
					{
						resource
							.then(
								function(resolved)
								{
									self._update(resolved,handler_options)
								}
							,	function()
								{
									self.element.html(can.view(self.options.render.fail))
								}
							)
					}
					else	if(resource)
						{
							this.current_control=false
							this.set_resource(resource)
							// this.on()
							//this.proxy(this.options.render.content,'')
							this.render_resource(this.options.resource,handler_options)
						}
						else
						{
							this.current_control=false
							this.set_resource(resource)
							// this.on()
							//this.proxy(this.options.render.content,'')
							this.element.html(can.view(this.options.render.empty))
						}

				}
			,	set_resource:function(resource)
				{
					var	self
					=	this
					if	(resource instanceof Sigma.Model.HAL.Resource.List)
						throw	'Resource.List not suported in containers'
					if	(
							resource instanceof Sigma.Model.HAL.Collection
						||	resource instanceof Sigma.Model.HAL.Resource
						)
							this.options.resource=resource
					else
						if	(resource)
							throw	'Wrong resource type!!!'
				}
			,	getRelationHandler: function(relation)
				{
					return	_.find(
								this.options.media_types
							,	function(data,rel)
								{
									return	_.contains(
												rel.replace(/ /g,'').split(',')
											,	relation
											)
								}
							)
						||	this.options.default_media_type
				}
			,	getRelationTarget: function(target_name)
				{
					return	target_name
						||	this.options.target
				}
			,	getSubRelationHandler: function(relation_found,resource_rel)
				{
					return	relation_found[this.options.id.toLowerCase().split('_'+resource_rel,1)[0]]
						||	undefined
				}
			,	render_resource: function(resource_to_render,handler_options)
				{
					var	self = this
					,	rel = resource_to_render.rel
					,	self_rel = this.getRelationHandler(resource_to_render.rel)
					//console.log(self_rel,rel,resource_to_render)
					self_rel = this.getSubRelationHandler(self_rel,rel)
						?can.extend(self_rel,this.getSubRelationHandler(self_rel,rel))
						:self_rel
					/*if	(_.isEqual(this.current_handler,self_rel.Handler))	{
						console.log()
						can.trigger(
							this.container_element
						,	'change_slot'
						,	resource_to_render
						)
					}	else	{*/
						if	(this.container_element)
							this.element.find('.hc_generic').unbind()
						this.element.empty()
						this.container_element = $('<div>').appendTo(this.element)
						this.current_handler = self_rel.Handler
						new	self_rel.Handler(
								this.container_element
							,	can.extend(
									_.extend(self_rel.options||{},handler_options||{})
								,	{
										container: self
									,	target: self_rel.options.target
									,	slot: resource_to_render
									}
								)
							)
					//}
				}
			,	browse: function(link,options)
				{
					this.slot(
						link.resolve()
					||	link.get()
					,	options
					)

				}
			,	slot: function(value,options)
				{
					if(!value)
						return	this.options.resource
					this.options.slot = value
					this.update(
						options
					)
				}
			,	'{slot} change': function(target, ev, newVal)
				{
					if( target.isComputed )
						this._update(newVal)
				}
			,	' browse': function(el,ev,args)
				{
					ev.stopPropagation()
					console.log('browse',args.target,args.data)
					var	container
					=	this.constructor
								.findContainer(
									this.getRelationTarget(
											args.target
										)
								)
					if	(args.data instanceof Sigma.Model.HAL.Link)
						container
							.browse(
								args.data
							,	args.options
							||	{}
							)
					else
					if	(
							args.data instanceof Sigma.Model.HAL.Resource
						||	args.data instanceof Sigma.Model.HAL.Collection
						||	can.isDeferred(args.data)
						)
							container
								.slot(
									args.data
								,	args.options
								||	{}
								// ,	args.rel?can.extend(args.options,{rel: can.underscore(args.rel)}):args.options
								)
				}
			}
		)
	}
)
