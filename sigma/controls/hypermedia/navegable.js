steal(
	'sigma/lib'
,	'sigma/util'
,	'sigma/controls/hypermedia/updatable.js'
).then(
	function()
	{
		can.Control(
			'Sigma.HypermediaNavegableControl'
		,	{
				defaults:
				{
					media_types:{}
				,	sub_options:false
				,	inicializable: true
				,	rel: false
				}
			}
		,	{
				init:	function(el,options)
				{

					Sigma.Model.HAL.Collection('Sigma.Model.HAL.Resource.Root')

					this.hypermedia_containers = {}

					this._set_hypermedia_controls()
					
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

					if(!this._search_hypermedia_container(rel) && this.options.inicializable)
					{
						if(data.element_action)
						{
							link[rel] 
							= 	{
									url: data.links[rel].href
								}
							sub_options = {sub_options: link, rel: rel}
						}
						if(hc && hc.children.fullName != undefined)
						{
							hc.children = new hc.children(hc.element,can.extend(data,sub_options))
							can.each(
								data.sub_options
							,	function(item,index){
									t = hc.children.options.media_types[index]
									hc.children.children = (t && t.navegable_control)
										? t.navegable_control
										: {}
								}
							)
						}
						else
						{
							hc.children._hypermedia_control_setup(
								hc.children.options.media_types[rel]
							,	rel
							,	sub_options.sub_options
							)
						}
					}

					if(data.links && data.element_action && hc.children.options.media_types[rel])
					{
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
			,	_set_hypermedia_controls: function()
				{
					var	self
					=	this
					can.each(
						this.options.media_types
					,	function(item, index)
						{
							if(self.options.inicializable || self.options.rel == index)
							{
								self._hypermedia_control_setup(item,index,self.options.sub_options)
							}
						}
					)
				}
			,	_hypermedia_control_setup: function(item, index, sub_options)
				{
					if(item)
					{
						var 	media 
						= 	{}
						,	hypermedia_container_new
						=	{}

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

						media[index] = item

						Sigma.HypermediaContainer(
							'Sigma.' + can.capitalize(index)
						)

						if(this.options.inicializable)
							hypermedia_container_new = new Sigma[can.capitalize(index)](
								$element
							,	{
									media_types: media
								,	id: can.capitalize(index)
								,	slot: Sigma.Model.HAL.Resource.Root.getRoot(
										(sub_options[index])
										?	sub_options[index].url
										: 	item.url
									,	index
									)
								}
							)
						else
							hypermedia_container_new = new Sigma[can.capitalize(index)](
								$element
							,	{
									media_types: media
								,	id: can.capitalize(index)
								}
							)


						hypermedia_container_new.children = item.navegable_control != undefined
								?	item.navegable_control
								: 	{}

						this.hypermedia_containers[index] = hypermedia_container_new

						media = {}
					}
					else
						throw "MEDIA TYPE NOT DEFINED"
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
			}
		)
	}
)
