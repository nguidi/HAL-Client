var H
steal(	'sigma/lib'
,	'sigma/util'
).then(
	function()
	{
		can.Control(
			'Sigma.HypermediaNavegableControl'
		,	{
				defaults:
				{
					containers:{}
				,	sub_options:false
				,	inicializable: true
				}
			}
		,	{
				init:	function(el,data)
				{
					//new array hypemerdia containers
					this.hypermedia_containers = {}

					this._set_hypermedia_containers(data)
				}
			,	' navegable': function(el,ev,data)
				{	
					ev.stopPropagation()
					var 	hc 
					= 	this.hypermedia_containers[can.underscore(data.target)]
					,	link
					=	{}
					,	sub_options
					= 	{}
					,	rel
					=	data.element_action?data.element_action.data('link').rel:''

					//console.log(hc,rel,data.element_action.data('link'),this.hypermedia_containers)

					if(!this._search_hypermedia_container(rel) && this.options.inicializable)
					{
						if(data.element_action)
						{	
							link[rel] 
							= 	{
									url: data.element_action.data('link').links.self.href
								}
							sub_options = {sub_options: link, rel: rel}
						}
						if(hc && hc.children.fullName != undefined)
						{
							hc.children = new hc.children(hc.element,can.extend(data,sub_options))
							can.each(
								data.sub_options
							,	function(item,index){
									t = hc.children.options.containers[index]
									hc.children.children = (t && t.navegable_control)
										? t.navegable_control
										: {}
								}
							)
						}
						/*else
						{
							hc.children._hypermedia_container_setup(
								this._search_media_type(hc,rel)
							,	rel
							,	sub_options.sub_options
							)
						}*/
					}

					if(data.links && data.element_action)
					{
						//console.log("DATA BROWSE",data,rel)
						can.trigger(
							this.element
						,	'browse'
						,	{
								links: data.links
							,	rel: rel
							,	name: data.element_action.data('link').name
							,	target: data.target
							}
						)
					}
				}
			,	_set_hypermedia_containers: function(data)
				{
					var	self
					=	this
					,	resource
					=	undefined

					//console.log("DATA _set_hypermedia_containers: ",data)

					can.each(
						this.options.containers
					,	function(item, index)
						{
							var 	item_aux
							=	undefined
							,	index_aux
							=	0

							resource = data.links.get(index)
							if(!resource)
							{
								item_aux
								= 	_.find(
										item.media_types
									,	function(mit,mi)
										{
											index_aux = mi
											return data.links.get(mi)
										}
									)
								resource 
								=	data.links.get(index_aux)	
							}
							resource.rel = index

							if(self.options.inicializable && resource)
							{
								self._hypermedia_container_setup(
									item_aux?item_aux:item
								,	index
								,	resource
								)
							}
						}
					)
				}
			,	_hypermedia_container_setup: function(item, index, resource)
				{
					//console.log("Arguments _hypermedia_container_setup: ", item, index, resource)
					if(item)
					{
						var 	hypermedia_container_new
						=	{}
						,	slot
						= 	undefined

						if(can.$('div#'+index+'').length==0)
						{
							$element = can.$('<div id="'+index+'">')
							can.append(
								this.element
							,	$element
							)
						}
						else
							$element = can.$('div#'+index+'')

						if(this.options.inicializable)
						{
							slot = 	(resource instanceof Sigma.Model.HAL.Resource)
								?	resource
								: 	item.resource.fetch(
										item.url
									,	index
									)
						}
							
						hypermedia_container_new 
							= 	this._install_element_hc(index,$element,item,slot)

						hypermedia_container_new.children = item.navegable_control != undefined
								?	item.navegable_control
								: 	{}

						this.hypermedia_containers[index] = hypermedia_container_new

						media = {}
					}
					else
						throw "HYPERMEDIA CONTAINER NOT DEFINED"
				}
			,	_search_hypermedia_container: function(nelly)
				{
					var 	neri_gato
					=	undefined

					can.each(
						this.hypermedia_containers
					,	function(item,index)
						{
							hc = item.children.hypermedia_containers
							if(hc && hc[nelly])
								neri_gato = hc[nelly]
						}
					)

					return 	this.hypermedia_containers[nelly]
					?	this.hypermedia_containers[nelly]
					: 	neri_gato
				}
			,	_install_element_hc: function(index, $element, media, slot)
				{
					//console.log("Arguments ",arguments)
					var 	media_aux
					=	{}
					media_aux[index] = media
					var	options
					=	{
							media_types: media[index]?media:media_aux
						,	id: can.capitalize(index)
						}

					Sigma.HypermediaContainer(
						'Sigma.' + can.capitalize(index)
					)
					
					return new Sigma[can.capitalize(index)](
						$element
					,	slot
						?	can.extend(
								options
							,	{
									slot : slot
								}
							)
						: 	options
					)
				}
			}
		)
	}
)
