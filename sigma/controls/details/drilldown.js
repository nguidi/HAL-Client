steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Controls.DrillDown'
		,	{
				defaults: {
				}
			}
		,	{
				_render_content: function(data)
				{
					var 	links
					=	new Array()
					,	home
					
					data.links.each(
						function(link,attr)
						{
							if (this.rel && this.rel == 'home')
								home = this
							else if (this.rel && this.rel != 'self')
								links.push(this)
							console.log(this)
						}
					)

					this.element
						.html(
							can.view(
								this.options.view_drilldown
							,	{
									links: links
								,	home: home
								}
							)
						)

					if (links.length == 0)
						this.element
							.find('.breadcrumb')
							.hide()

					this.activate(
						this.element
							.find('ul li a:last')
					)
				}

			,	deactivate: function(element)
				{
					var 	text 
					= 	can.trim(
							element
								.text()
								.split('/')
								.reverse()[0]
						)
					if (element.hasClass('home'))
						element.html(
							can.$('<a href="#">')
							.addClass('browseable')
							.html(element.html())
						)
					else
					{
						element.html(
							can.$('<span>')
							.addClass('divider')
							.text("/")	
						)

						can.append(
							element
						,	can.$('<a href="#">')
							.addClass('browseable')
							.text(text)
						)
					}

					element
						.removeClass('active')
				}

			,	activate: function(element)
				{
					this.deactivate(
						element
							.parent('li')
							.parent('ul')
							.find('li.active')
					)

					if (element.parent('li').hasClass('home'))
						element
							.parent('li')
							.addClass('active')
							.append(
								can.$('<i class="icon-home">')
							)
					else
						element
							.parent('li')
							.addClass('active')
							.append(
								element
									.text()
							)

					element
						.remove()
				}

			,	'.browseable click': function(element,event)
				{
					if (!element.parent('li').hasClass('active'))
					{
						this.activate(element)
						this.element.trigger(
							'browse'
						,	{
								links: this.options.slot.links
							,	rel: element.data('link').rel
							,	name: element.data('link').name
							,	target: self.options.target
							}
						)
					}
				}
			}
		)
	}
)