steal(
	'sigma/stock/controls/lib'
,	'sigma/hal/collections.js'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.Tabs'
		,	{
				defaults:{
					view_form:false
				}
			}
		,	{
				_render_content: function(data)
				{	
					this.loadTemplate(data)
					this.autoloadFirstTab()
				}

			,	autoloadFirstTab: function()
				{
					this.loadTabByIndex(0)
				}

			,	loadTemplate:function(data)
				{
					can.append(
							this.element
						,	can.$('<div class="tabs-wrapper">')
								.append(
									can.view(this.options.view_form,data)
								)
						)
				}

			,	toggleActive: function(li)
				{
					this.element
						.find('li.active')
						.removeClass('active')
					li.addClass('active')

					this.element
						.find('li.active')

				}

			,	showActive: function()
				{
					var toShowId
					=	this.element
							.find('li.active a')
							.attr('href')
							.substr(1)
					
					this.element
						.find('.tab-pane').hide()
					this.element
						.find('#'+toShowId).show()
				}

			,	loadTabByIndex: function(index)
				{
					this.element
						.find('li')
						.eq(index)
						.children('a.browseable')
						.trigger('click')
				}

			,	'li a.browseable click': function(el, ev)
				{
					if (!el.parent('li').hasClass('active'))
					{
						this.toggleActive(el.parent('li'))
						this.showActive()
						console.log("2Browse",{
								links: this.options.slot.links
							,	rel: 'template_sections_general'
							,	name: el.data('link').name
							,	target: (this.options.target_content)
									? this.options.target_content
									: this.options.target
							})
						
						this.element.trigger(
							'browse'
						,	{
								links: this.options.slot.links
							,	rel: 'template_sections_general'
							,	name: el.data('link').name
							,	target: (this.options.target_content)
									? this.options.target_content
									: this.options.target
							}
						)
					}
				}
			}
		)
	}
)
