Sigma.HypermediaControl(
	'Sigma.Hypermedia.Body'
,	{
		defaults: {
			view : false
		}
	}
,	{
		_render_content: function(data)
		{
			this.element.addClass('media-box')

			can.append(
				this.element
			,	can.view(
					this.options.view
				,	data
				)
			)

			var self = this

			can.each(
				data.attr('handler')
			,	function(handler,attr_rel)
				{
					if (Sigma.Controls[handler.control].instance() instanceof Sigma.HypermediaControl)
						self.options.container.constructor(
							self.element
						,	{
								id: self.generateContainerID(data.attr(attr_rel))
							,	parent: self.options.container.options.id
							,	target: self.generateContainerID(data.attr(attr_rel))
							,	slot: data.attr(attr_rel)
							}
						)	
					else
						if (can.isFunction(Sigma.Controls[handler.control]))
							new Sigma.Controls[handler.control](
									self.element.find(handler.target).parent()
								,	{
										data : data.attr(attr_rel)
									,	target : handler.target
									,	view : handler.view 
									}
								)
				}
			)

			if (data.attr('subitems'))
				can.each(
					data.attr('subitems')
				,	function(subitem)
					{
						self.options.container.constructor(
							self.element
						,	{
								id: self.generateContainerID(subitem)
							,	parent: self.options.container.options.id
							,	target: self.generateContainerID(subitem)
							,	slot: subitem
							}
						)
					}
				)
		}

	,	generateContainerID: function(item)
		{
			return 	this.options.container.options.id
				+'.'+
				can.capitalize(item.rel)
				+'.'+
				can.capitalize(item.id).replace(/\s/g,'')
		}
	}
)