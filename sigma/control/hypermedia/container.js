steal(
	'sigma/lib'
,	'sigma/util'
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
						loading:
							function(message)
							{
								this.element.html(can.EJS({text:'cargando...'})(message))
							}
					,	empty:
							function()
							{
								this.element.html(can.EJS({text:'vacio...'})())
							}
					,	fail:
							function()
							{
								this.element.html(can.EJS({text:'fail...'})())
							}
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
				return	this.containers[container_id]
				}
			,	registerChild:function(conteiner_id,child)
				{
					if(this.containers[conteiner_id].children[child.options.id])
						throw can.sub('Container Child "{id}" already registered',child.options)
					this.containers[conteiner_id].children[child.options.id] = child
				}
			,	registerContainer:function(container)
				{
					if(this.containers[container.options.id])
						throw can.sub('Container "{id}" already registered',container.options)
					if(container.options.parent && this.containers[container.options.parent])
						this.registerChild(container.options.parent,container)
					this.containers[container.options.id]=container
				}
			}
		,	{
				init:	function(el,options)
				{
					this.children = new Object()
					if(!options.id)
						throw 'Container must have an "id" property'
					this.constructor.registerContainer(this)
					this.update()

				}
			,	update:	function(options)
				{
					this._super(options)
					var	resource=this.options.slot
					if(resource && resource.isComputed)
						resource=resource()
					this._update(resource)
				}
			,	_update:function(resource)
				{
					//console.log(resource)
					if(can.isDeferred(resource))
					{
						this.proxy(this.options.render.loading,'')
						resource.done(this.proxy(this._update))
						resource.fail(this.proxy(this.options.render.fail,''))
					}
					else	if(resource)
						{
							this.current_control=false
							this.set_resource(resource)
							this.on()
							//this.proxy(this.options.render.content,'')
							this.render_resource(this.options.resource)
						}
						else
						{
							this.current_control=false
							this.set_resource(resource)
							this.on()
							//this.proxy(this.options.render.content,'')
							this.proxy(this.options.render.empty,'')
						}

				}
			,	_parent: function()
				{
					return 	this.options.parent 
					&& 	this.constructor.containers[this.options.parent]
				}
			,	_children: function()
				{
					return 	!can.isEmptyObject(this.children) 
					&& 	this.children
				}
			,	set_resource:function(resource)
				{
					var	self=this
					if(
						(resource instanceof Sigma.Model.HAL.Resource.List)
					)	throw	'Resource.List not suported in containers'
					if(
						(resource instanceof Sigma.Model.HAL.Collection)
					||	(resource instanceof Sigma.Model.HAL.Resource)
					)
						this.options.resource=resource
					else
					{
						if	(resource)
							throw	'Wrong resource type!!!'
					}
				}
			,	getRelationHandler: function(resource)
				{
					//relation/profile -> semantic/meaning mapping logic here, please
					//this.options.media_types[resource.rel][this.options.id.toLowerCase().split('_',1)[0]]
				console.log(resource)
				return	_.find(
							this.options.media_types
						,	function(data,rel)
							{
								return	_.contains(
											rel.replace(/ /g,'').split(',')
										,	resource.rel
										)
							}
						)
					||	this.constructor.containers[can.capitalize(resource.rel)].options.media_types[resource.rel]
					||	(
						resource.links._profile
							?this.options.media_types[resource.links._profile.href]
							:this.options.default_media_type
						)
					||	{
							Handler:Sigma.HypermediaControl
						,	options:{
								resource: can.compute({})
							,	target: this.options.target
							}
						}
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
			,	render_resource: function(resource_to_render)
				{
					var	self = this
					,	self_rel = this.getRelationHandler(resource_to_render)
					self_rel = this.getSubRelationHandler(self_rel,resource_to_render.rel)
						?can.extend(self_rel,this.getSubRelationHandler(self_rel,resource_to_render.rel))
						:self_rel
					if(this.container_element)
						this.container_element.remove()
					this.container_element = $('<div>').appendTo(this.element)
					if(self_rel.options)
						new	self_rel.Handler(
								this.container_element
							,	can.extend(
									self_rel.options||{}
								,	{
										container: self
									,	target: self_rel.options.target
									,	slot: resource_to_render
									}
								)
							)
				}
			,	browse: function(link)
				{
					this.slot(
						link.fetch()
						.pipe(
							function(raw)
							{
								raw.rel=link.rel
							return	raw
							}
						)
					)
				}
			,	slot: function(value)
				{
					if(!value)
					return	this.options.resource
					this.update(
						{
							slot: value
						}
					)
				}
			,	_set_deferred_slot:function(def, data)
				{
					def
					.pipe(
						function(raw)
						{	
							raw.rel = data.rel
							return	raw
						}
					)
					.then(
						function(result)
						{
							if(container.slot().links[data.storage])
							{
								container.slot().embedded
								.attr(data.storage,result)
							}
							else
							{
								container.slot(result)
							}
						}
					)
				}
			,	'{slot} change': function(target, ev, newVal)
				{
					if( target.isComputed )
						this._update(newVal)
				}
			,	' browse': function(el,ev,data)
				{
					/*console.log("data: ",data)
					console.log("this constructor: ",this)
					A = this*/

					ev.stopPropagation()
					if(typeof(data.links) == "object")
					{
						this.constructor
							.findContainer(this.getRelationTarget(data.target))
							.browse(
								Sigma.Model.HAL.lookup(
									data.links
								,	data.rel
								,	data.name
								)
							)
						this.element.trigger('router',data)

					}
					else
					{
						this._set_deferred_slot(
							Sigma.Model.HAL.Collection.Post(
								data.links
							,	data.params
							)
						,	data
						)
					}
				}
			,	' browse_data': function(el,ev,data)
				{
					//A = this
					//B = data.slot
					//console.log("this constructor: ",this)
					ev.stopPropagation()
				var	container 
				= 	this.constructor.findContainer(this.getRelationTarget(data.target))
				var	link 
				= 	container.slot().links[data.storage]
					?container.slot().links[data.storage]
					:container.slot().links.self
					this._set_deferred_slot(
						Sigma.Model.HAL.Collection.Post(
							link.href
						,	data.params
						)
					,	data
					)
				}
			}
		)
	}
)
