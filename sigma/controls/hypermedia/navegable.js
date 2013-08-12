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
				,	inicializable: true
				,	view: undefined
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
					//console.log(data)
					ev.stopPropagation()
					var 	hc 
					= 	this.hypermedia_containers[can.underscore(data.target)]

					/*if(!this._search_children_nav(data.target) && hc && hc.children)
					{
						
					}*/
					console.log(data)

					if(data.links && data.target)
					{
						can.trigger(
							$('div#'+can.underscore(data.target)) || this.element
						,	'browse'
						,	{
								link: data.links
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

					can.each(
						this.options.containers
					,	function(item, index)
						{
							var item_aux
							=	undefined
							,	index_aux
							=	0
							if(data.links)
							{
								resource	=	data['get'+can.capitalize(index)]
								?	data['get'+can.capitalize(index)]()
								: 	undefined
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
									can.extend(
										item_aux
									, 	{
											media_types:item.media_types
										,	class: item.class
										}
									)	
								}
							}
							else
							{
								resource = item.resource
								if(!resource)
								{
									item_aux
									= 	_.find(
											item.media_types
										,	function(mit,mi)
											{
												index_aux = mi
												return mit.resource
											}
										)
									resource 
									=	item_aux.resource
									can.extend(
										item_aux
									, 	{
											media_types:item.media_types
										,	class: item.class
										}
									)
								}
							}

							if(self.options.inicializable)
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
					console.log("Arguments _hypermedia_container_setup: ", item, index, resource)
					if(item)
					{
						var 	hypermedia_container_new
						=	{}
						,	slot
						= 	undefined

						if(this.options.view)
						{
							can.append(
								this.element
							,	can.view(this.options.view)
							)
						}
						if(can.$('div#'+index+'').length==0)
						{
							$element = can.$('<div id="'+index+'">')
							if(item.class)
								$element.addClass(item.class)
							can.append(
								this.element
							,	$element
							)
						}
						else
							$element = can.$('div#'+index+'')

						if(this.options.inicializable && resource)
						{
							slot = 	(resource instanceof Sigma.Model.HAL.Resource)
								?	resource
								: 	item.resource.Fetch(
										item.url
									,	index
									)
						}
							
						hypermedia_container_new 
							= 	this._install_element_hc(index,$element,item,slot)

						this.hypermedia_containers[index] = hypermedia_container_new

						media = {}
					}
					else
						throw "HYPERMEDIA CONTAINER NOT DEFINED"
				}
			,	_search_children_nav: function(data_target)
				{
					var 	neri_gato
					=	undefined
					,	container
					=	can.underscore(data_target)

					can.each(
						this.hypermedia_containers
					,	function(item,index)
						{
							hc = item.children
							if(hc && hc[container])
								neri_gato = hc[container]
						}
					)

					return 	neri_gato
				}
			,	_install_element_hc: function(index, $element, media, slot)
				{
					var 	media_aux
					=	{}

					media_aux[index] = media
					var	options
					=	{
							media_types: can.extend(
									media[index]
									?	media
									: 	media_aux
								,	media.media_types
								)
						,	id: can.capitalize(index)
						}
					can.each(
						media.media_types
					,	function(item,index)
						{
							can.extend(options.media_types,item.children_media_types)
						}
					)

					console.log(options)

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
