can.Control(
	'Sigma.Controls.Dropdown'
,	{
		defaults:{
			autohide: true
		}
	}
,	{
		init: function()
		{
			this.$toggler
			=	this.element
					.find('.dropdown-toggle')
			this.$dropdown 
			= 	this.element
					.find('.dropdown-menu')
			if (this.$toggler.hasClass('primal'))
				this.primalToggler(
					this.$dropdown
						.find('a:first')
						.text()
				)

		}

	,	primalToggler: function(text)
		{
			this.$toggler
				.html(
					can.view.frag(
						new can.Mustache(
							{ 
								text: '{{.}} <span class="caret"></span>'
							}
						).render(
							text
						)
					)
				)
		}

	,	getCSS: function()
		{
			var 	parent = can.$(this.element).parent().position()
			,	pos = can.$(this.element).position()
			,	toggler = this.$toggler
			,	doc = can.$(document)
			,	dropdown = this.$dropdown
			return {
				top: pos.top + toggler.height() + 15
			,	left: (parent.left + pos.left + toggler.width() + dropdown.width() < doc.width())
					? pos.left
					: pos.left + toggler.width() - dropdown.width() + 30
			,	right: 'auto'
			,	opacity: 0
			}
		}

	,	hide_dropdown: function()
		{
			var self = this
			this.$dropdown
				.animate(
					{
						opacity: 0
					}
				,	300
				,	function()
					{
						self.element
							.removeClass('open')
					}
				)
		}

	,	show_dropdown: function()
		{
			this.$dropdown
				.css(
					this.getCSS()
				)

			this.element
				.addClass('open')
			this.$dropdown
				.animate(
						{
							opacity: 1
						}
					,	300
					)
		}

	,	'.dropdown-toggle click': function(el,ev)
		{
			var isActive 
			= 	this.element
					.hasClass('open')
			,	self = this

			if(!isActive) {
				this.show_dropdown()
				if (this.options.autohide)
					this.timeout = setTimeout(
						function()
						{
							self.hide_dropdown()
						}
					,	5000
					)
			}
			else
				this.hide_dropdown()
		}

	,	'.dropdown-menu li a click': function(el)
		{
			this.hide_dropdown()
			if (this.$toggler.hasClass('primal'))
				this.primalToggler(el.text())
		}

	,	'.dropdown-menu mouseenter': function()
		{
			if (this.options.autohide)
				clearTimeout(this.timeout)
				
		}

	,	'.dropdown-menu mouseleave': function()
		{
			if (this.options.autohide)
				clearTimeout(this.timeout)
			var self = this
			this.timeout = setTimeout(
				function()
				{
					self.hide_dropdown()
				}
			,	3000
			)
				
		}
	}
)