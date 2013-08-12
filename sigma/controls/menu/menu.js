steal(
	'sigma/controls/hypermedia/control.js'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Control.Menu'
		,	{
				defaults:
				{
					view: false
				,	target: false
				}
			}
		,	{
				toggleActive: function(li)
				{
					if (li.hasClass('active') || li.hasClass('drop-active'))
						return false
					else {
						li.parents('ul')
							.find('li.active')
							.removeClass('active')
						li.parents('ul')
							.find('li.drop-active')
							.removeClass('drop-active')
						if	(li.parent('ul').hasClass('dropdown-menu'))
							li.addClass('drop-active')
						else
							li.addClass('active')
						return true
					}
				}

			,	'.browseable click': function(el, ev)
				{
					if (this.toggleActive(el.is('li') ? el : el.parent('li')))
						can.trigger(
							this.element
						,	'navegable'
						,	{
								target: this.options.target
							,	links: el.data('link')
							}
						)
				}
			}
		)
	}
)
