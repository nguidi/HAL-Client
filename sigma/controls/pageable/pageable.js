steal(
	'sigma/controls/hypermedia/control.js'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Control.Pageable'
		,	{
				defaults:{
					view_links: false
				,	view_content: false
				,	view_empty_data: 'sigma/controls/pageable/views/empty.mustache'
				}
			}
		,	{
				_render_content: function(data)
				{
					var exists = 	this.element.find('div').hasClass('content') 
					||		this.element.find('div').hasClass('links')

					if(data.links.next)
						data.attr('next',data.links.next)

					if(data.links.prev)
						data.attr('prev',data.links.prev)
					
					if (!exists && data.code != "404") {
						this._render_pageable_content(data)
						this._render_pageable_links(data)
						this._update_content(data)
					}
					else
					{
						this.element.html(
							can.view(
								this.options.view_empty_data
							,	data
							)
						)

					}
				}

			,	_render_pageable_content: function(data)
				{
					if(this.options.view_content)
					{
						can.append(
							this.element
						,	can.$('<div class="header">')
						)
						can.append(
							this.element
								.find('div.header')
						,	can.view(
								this.options.view_content
							,	data
							)
						)
					}
					if(!this.element.find('#list_table'))
						can.append(
							this.element
						,	can.$('<div class="content">')
						)

					can.append(
						this.element
							 	.find('#list_table')
						||	this.element
								.find('div.content')
					,	can.view(
							this.options.view
						,	data
						)
					)
				}

			,	_render_pageable_links: function(data)
				{
					can.append(
						this.element
					,	can.$('<div class="links">')
					)

					can.append(
						this.element
							.find('div.links')
					,	can.view(
							this.options.view_links
						,	data
						)
					)
				}

			,	_update_content: function(data)
				{
					//console.log("PAGEABLE CONTROL - DATA RENDER",data)
					// update pageable content
					this.element
						.find('div.content')
						.empty()

					can.append(
						this.element
							.find('div.content')
					,	can.view(
							this.options.view
						,	data
						)
					)

					// update pageable links
					this.element
						.find('div.links')
						.empty()

					can.append(
						this.element
							.find('div.links')
					,	can.view(
							this.options.view_links
						,	data
						)
					)

					if (data.attr('prev'))
						this.element
							.find('ul.paginable')
							.find('li.previous')
							.removeClass('disabled')
					else
						this.element
							.find('ul.paginable')
							.find('li.previous')
							.addClass('disabled')

				        if (data.attr('next'))
						this.element
							.find('ul.paginable')
							.find('li.next')
							.removeClass('disabled')
					else
						this.element
							.find('ul.paginable')
							.find('li.next')
							.addClass('disabled')
				}
			,	'ul.paginable li:not(".disabled") click' : function(element,event)
				{
					can.trigger(
						this.element
					,	'browse'
					,	{
							link:	element.data('link')
						}
					)
				}
			}
		)
	}
)