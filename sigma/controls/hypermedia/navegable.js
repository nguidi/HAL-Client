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
				init:	function(el,options)
				{
					//new array hypemerdia containers
					this.hypermedia_containers = {}

					this._set_hypermedia_containers()
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

					console.log(hc,rel,data.element_action.data('link'),this.hypermedia_containers)

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
						console.log("DATA BROWSE",data,rel)
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
			,	_set_hypermedia_containers: function()
				{
					var	self
					=	this
					can.each(
						this.options.containers
					,	function(item, index)
						{
							if(self.options.inicializable || self.options.rel == index)
							{
								self._hypermedia_container_setup(item,index,self.options.sub_options)
							}
						}
					)
				}
			,	_hypermedia_container_setup: function(item, index, sub_options)
				{
					if(item)
					{
						var 	media 
						= 	{}
						,	hypermedia_container_new
						=	{}
						,	slot
						= 	undefined
						,	media_type
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

						Sigma.HypermediaContainer(
							'Sigma.' + can.capitalize(index)
						)

						if(item.media_types)
						{
							media = item.media_types
							can.each(
								item.media_types
							,	function(item, inde)
								{
									if(item.inicializable)
										media_type = inde
								}	
							)
						}
						else
						{
							media_type = index
							media[index] = item
						}

						console.log(media, index, media_type)

						if(this.options.inicializable)
						{
							slot = media[media_type].resource.fetch(
								(sub_options[media_type])
								?	sub_options[media_type].url
								: 	media[media_type].url
							,	media_type
							)
						}
							
						hypermedia_container_new 
							= 	this._install_element_hc(index,$element,media,slot)

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
			,	_install_element_hc: function(index,$element,media,slot)
				{
					var 	options
					=	{
							media_types: media
						,	id: can.capitalize(index)
						}
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
