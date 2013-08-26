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
				,	view: false
				,	slot: false
				}
			}
		,	{
				init:	function(el,options)
				{
					// new array hypemerdia containers
					this.hypermedia_containers = _.keys(this.options.containers)
					// this._set_hypermedia_containers(data)
					

					var	self
					=	this
					
					if(self.options.view)
					{
						this.options.view=steal.idToUri(this.options.view).path
						can.append(
							self.element
						,	can.view(self.options.view)
						)
					}

					can.when(
						can.map(
							this.hypermedia_containers
						,	function(index)
							{
								var item
								=	self.options.containers[index]

								if(can.$('div#'+index).length==0)
								{
									$element = can.$('<div id="'+index+'">')
									if(item.class)
										$element.addClass(item.class)
									can.append(
										self.element
									,	$element
									)
								}
								else
									$element = can.$('div#'+index+'')
								
								// self.hypermedia_containers[index]
								// =	self.install_hc(index,$element,item)
								return	self.install_hc(index,$element,item)
							}
						)
					).done(
						function(hcs)
						{
							self._update(self.options.slot)
						}
					)
				}

			,	install_hc: function(index,$element,media)
				{
					var	media_aux
					=	{}

					media_aux[index] = media
					var	options
					=	{
							media_types:
								can.extend(
									media[index]
									?	media
									: 	media_aux
								,	media.media_types
								)
						,	id: 	can.capitalize(index)
						}

					can.each(
						media.media_types
					,	function(item,index)
						{
							can.extend(options.media_types,item.children_media_types)
						}
					)

					var	HyperMediaContainer
					=	Sigma.HypermediaContainer(
							'Sigma.' + can.capitalize(index)
						)

					return	new	HyperMediaContainer(
								$element
							,	options
							)
				}

			,	_update: function(resource)
				{
					var self
					=	this
					
					if(can.isDeferred(resource))
					{
						resource
							.then(
								function(resolved)
								{
									self._update(resolved)
								}
							)
					}
					else
						if(resource)
							this.set_containers_slots(resource)
				}
				
			,	set_containers_slots: function(data)
				{
					var self
					=	this
					,	resource
					=	undefined

					if	(data)
						can.each(
							this.options.containers
						,	function(item, index)
							{
								resource
								=	can.isDeferred(data)
										?	data
										:	(!_.isEmpty(item.resource) && !_.isEmpty(item.url))
											?	item.resource.Fetch(item.url,index)
											:	_.isFunction(data['get'+can.capitalize(index)])
												?	data['get'+can.capitalize(index)]()
												:	false
								if	(
										resource instanceof	Sigma.Model.HAL.Resource
									||	resource instanceof Sigma.Model.HAL.Collection
									||	resource instanceof Sigma.Model.HAL.Link
									||	can.isDeferred(resource)
									)
										can.trigger(
											self.element.find('#'+index)
										,	'browse'
										,	{
												data:	resource
											,	target:	can.capitalize(index)
											}
										)
							}
						)
				}

			// ,	_set_hypermedia_containers: function(data)
			// 	{
			// 		var	self
			// 		=	this
			// 		,	resource
			// 		=	undefined

			// 		can.each(
			// 			this.options.containers
			// 		,	function(item, index)
			// 			{
			// 				var item_aux
			// 				=	undefined
			// 				,	index_aux
			// 				=	0
			// 				if(data.links)
			// 				{
			// 					resource	=	data['get'+can.capitalize(index)]
			// 					?	data['get'+can.capitalize(index)]()
			// 					: 	undefined
			// 					if(!resource)
			// 					{
			// 						item_aux
			// 						= 	_.find(
			// 								item.media_types
			// 							,	function(mit,mi)
			// 								{
			// 									index_aux = mi
			// 									return data.links.get(mi)
			// 								}
			// 							)
			// 						resource 
			// 						=	data.links.get(index_aux)
			// 						can.extend(
			// 							item_aux
			// 						, 	{
			// 								media_types:item.media_types
			// 							,	class: item.class
			// 							}
			// 						)	
			// 					}
			// 				}
			// 				else
			// 				{
			// 					resource = item.resource
			// 					if(!resource)
			// 					{
			// 						item_aux
			// 						= 	_.find(
			// 								item.media_types
			// 							,	function(mit,mi)
			// 								{
			// 									index_aux = mi
			// 									return mit.resource
			// 								}
			// 							)
			// 						resource 
			// 						=	item_aux.resource
			// 						can.extend(
			// 							item_aux
			// 						, 	{
			// 								media_types:item.media_types
			// 							,	class: item.class
			// 							}
			// 						)
			// 					}
			// 				}

			// 				if(self.options.inicializable)
			// 				{
			// 					self._hypermedia_container_setup(
			// 						item_aux?item_aux:item
			// 					,	index
			// 					,	resource
			// 					)
			// 				}
			// 			}
			// 		)
			// 	}
			// ,	_hypermedia_container_setup: function(item, index, resource)
			// 	{
			// 		console.log("Arguments _hypermedia_container_setup: ", item, index, resource)
			// 		if(item)
			// 		{
			// 			var	hypermedia_container_new
			// 			=	{}
			// 			,	slot
			// 			= 	undefined

			// 			if(this.options.view)
			// 			{
			// 				can.append(
			// 					this.element
			// 				,	can.view(this.options.view)
			// 				)
			// 			}
			// 			if(can.$('div#'+index+'').length==0)
			// 			{
			// 				$element = can.$('<div id="'+index+'">')
			// 				if(item.class)
			// 					$element.addClass(item.class)
			// 				can.append(
			// 					this.element
			// 				,	$element
			// 				)
			// 			}
			// 			else
			// 				$element = can.$('div#'+index+'')

			// 			if(this.options.inicializable && resource)
			// 			{
			// 				slot = 	(
			// 							resource instanceof Sigma.Model.HAL.Resource
			// 						||	resource instanceof Sigma.Model.HAL.Collection
			// 						)
			// 					?	resource
			// 					: 	item.resource.Fetch(
			// 							item.url
			// 						,	index
			// 						)
			// 			}
							
			// 			hypermedia_container_new 
			// 				= 	this._install_element_hc(index,$element,item,slot)

			// 			this.hypermedia_containers[index] = hypermedia_container_new

			// 			media = {}
			// 		}
			// 		else
			// 			throw "HYPERMEDIA CONTAINER NOT DEFINED"
			// 	}
			// ,	_search_children_nav: function(data_target)
			// 	{
			// 		var 	neri_gato
			// 		=	undefined
			// 		,	container
			// 		=	can.underscore(data_target)

			// 		can.each(
			// 			this.hypermedia_containers
			// 		,	function(item,index)
			// 			{
			// 				hc = item.children
			// 				if(hc && hc[container])
			// 					neri_gato = hc[container]
			// 			}
			// 		)

			// 		return 	neri_gato
			// 	}
			// ,	_install_element_hc: function(index, $element, media, slot)
			// 	{
			// 		var 	media_aux
			// 		=	{}

			// 		media_aux[index] = media
			// 		var	options
			// 		=	{
			// 				media_types: can.extend(
			// 						media[index]
			// 						?	media
			// 						: 	media_aux
			// 					,	media.media_types
			// 					)
			// 			,	id: can.capitalize(index)
			// 			}
			// 		can.each(
			// 			media.media_types
			// 		,	function(item,index)
			// 			{
			// 				can.extend(options.media_types,item.children_media_types)
			// 			}
			// 		)

			// 		console.log(options)

			// 		Sigma.HypermediaContainer(
			// 			'Sigma.' + can.capitalize(index)
			// 		)
					
			// 		return new Sigma[can.capitalize(index)](
			// 			$element
			// 		,	slot
			// 			?	can.extend(
			// 					options
			// 				,	{
			// 						slot : slot
			// 					}
			// 				)
			// 			: 	options
			// 		)
			// 	}
			}
		)
	}
)
