steal(
	'sigma/control/hypermedia/control.js'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Control.Browser'
		,	{
				defaults:
				{
					view: false
				}
			}
		,	{
				'.browseable click': function(el,ev)
				{
					ev.preventDefault()
					console.log(el.data('link'))
					this.element.trigger(
							'browse'
						,	{
								links:	this.options.slot.links
							,	rel:	el.data('link').rel
							,	name:	el.data('link').name
							,	target:	this.options.target
							}
						)
				}
			}
		)
	}
)