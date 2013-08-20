steal(
	'sigma/controls/hypermedia/control.js'
,	'sigma/plugins'
).then(
	'./styles.css'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Control.Tabs'
		,	{
				defaults:
				{
					view:		false
				,	view_new:	false
				,	editable:	false
				,	new:		false
				,	hc_content:	undefined
				,	hc_id:		undefined
				}
			}
		,	{
				_render_content: function(data)
				{
					this._super(data)
					
					var	self
					=	this

					this.element
							.addClass('tabbable')

					this.element
							.find('ul')
								.addClass('nav nav-tabs')

					if	(this.options.editable)
						_.each(
							this.element.find('ul.nav-tabs li a')
						,	function(tab)
							{
								self.setEditable(tab)
								can.$(tab)
										.editable('disable')
							}
						)

					if	(this.options.new)
						this.addNewTab()

					if	(this.options.hc_content)
					{
						this.options.$content
						=	can.$('<div>')
									.addClass('tab-content tab-panel active')
										.appendTo(this.element)

						this.options.hc_id
						=	this.options.hc_id
						||	data.identity()+'_content'

						console.log(this.options.hc_content)

						new	this.options.hc_content(
								this.options.$content
							,	{
									id:	this.options.hc_id
								}
							)
					}
					
					this.element
							.find('ul.nav-tabs li:first a')
								.click()
				}

			,	setEditable: function(tab)
				{
					can.$(tab)
							.tooltip('destroy')

					can.$(tab)
							.tooltip(
								{
									title: 'Presione para editar'	
								}
							)

					can.$(tab)
							.editable(
								{
									type:			'text'
								,	title:			'Nombre del Tab'
								,	highlight:		false
								,	showbuttons:	false
								}
							)
							.removeClass('editable-click')
				}

			,	getNewTabName: function()
				{
					var	news
					=	this.element.find('ul.nav-tabs li:contains("Nueva Tab")')
					
					return	"Nueva Tab"
						+	(
								news.length
								?	" "+(news.length+1)
								:	""
							)
				}

			,	addNewTab: function()
				{
					can.append(
						this.element.find('ul.nav-tabs')
					,	can.view(
							this.options.view_new
						,	this.options.data
						)
					)
					this.element
							.find('ul li:last a')
								.addClass('addNewTab')
								.tooltip(
									{
										title:	'Presione para agregar un nuevo tab'
									}
								)
				}

			,	addNewEmptyTab: function(tab_name)
				{
					var	tab
					=	this.element
							.find('ul.nav-tabs li:last a')
					tab	
						.text(
								tab_name
							||	this.getNewTabName()
							)

					this.setEditable(tab)
				}

			,	'ul.nav-tabs li.active a click': function(el)
				{
					el
						.tooltip('hide')
				}

			,	'ul.nav-tabs li:not(".active") a click': function(el)
				{
					var	active
					=	this.element
							.find('li.active a')
					active
						.editable('disable')
					active
						.parent('li')
							.removeClass('active')
					el
						.editable('enable')
					el
						.parent('li')
							.addClass('active')

					can.trigger(
						this.element
					,	'browse'
					,	{
							target:	this.options.hc_id
						,	data:	el.data('tab')
						}
					)
				}

			,	'ul.nav-tabs li a.addNewTab click': function(el)
				{
					el
						.removeClass('addNewTab text-info')

					this.addNewEmptyTab()

					this.addNewTab()
				}
			}
		)
	}
)
