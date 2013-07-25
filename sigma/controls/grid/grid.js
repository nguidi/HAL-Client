var T;
steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.Grid'
		,	{
				defaults:
				{
					onInitEvent: false
				,	how_to_render: new Array()
				,	view: false
				}
			}
		,	{
				_render_content : function(data)
				{
					var	$element
					,	self 
					=	this
					,	link
					=	undefined
					,	media_types
					=	{}

					if (this.options.view)
						can.append(
							this.element
						,	can.view(
								this.options.view
							,	data
							)
						)
					//console.log(data.links)
					can.each(
						this.options.how_to_render
					,	function()
						{
							$element = can.$('#'+this)
							link =	data.links[this]
							//console.log(link)
							if (link != undefined)
							{
								media_types[this] = {url: link.href}
							}
						}
					)
					//console.log(media_types)

					//Aplicar Trigger a hypermedia navegable control
					can.trigger(
						this.element
					,	'navegable'
					,	{
							sub_options: media_types
						, 	target: this.options.target
						}
					)
					
					//T = new self.options.navegable_control(self.element,{sub_options: media_types})

					/*this.element
						.addClass(
							(this.options.id) 
							?	this.options.id
							:	data.id
						)*/

					/*if (this.options.view_grid)
						can.append(
							this.element
						,	can.view(
								this.options.view_grid
							,	data
							)
						)*/

					can.each(
						this.options.container
					,	function()
						{

							/*if (self.options.view_grid)
								$element = self.element.find('#'+this.element_id)
							else
							{
								$element = can.$('<div id="'+this.id+'">')
								
								can.append(
									self.element
								,	$element
								)
							}*/

							/*if (!self.options.container.children[this.target])
							{
								new self.options.container.constructor(
									$element
								,	{
										id: this.target
									,	parent: self.options.target
									}
								)
							}
							else
							{
								$element.data('controls',new Array(self.options.container.children[this.target]))
								self.options.container.children[this.target].element = $element
							}*/
						}
					)
					//this.browse_app(data.links)
				}

			/*,	browse_app: function(links)
				{
					var self = this
					links.each(
						function()
						{
							if (this.rel != 'self')
							{
								console.log("container_targets",self.options.container_targets,this.rel)
								if(self.options.container_targets[this.rel]!= undefined)
								{
									self.element.trigger(
										'browse'
									,	{
											links: links
										,	rel: this.rel
										,	name: this.name
										,	target:self.options.container_targets[this.rel].target
										}
									)
								}
							}
						}
					)
				}*/
			}
		)
	}
)