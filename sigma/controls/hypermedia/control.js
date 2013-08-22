steal(
	'sigma/lib'
,	'sigma/util'
,	'sigma/controls/hypermedia/updatable.js'
).then(
	function()
	{
		Sigma.UpdatableControl(
			'Sigma.HypermediaControl'
		,	{
				pluginName:	'hc_generic'
			,	defaults:
				{
					view:		'sigma/views/hypermedia/generic.mustache'
				}
			}
		,	{
				'.browseable click': function(el, ev)
				{
					ev.preventDefault()
					can.trigger(
						this.element
					,	'browse'
					,	{
							data:	el.data('resource')
						,	target:	this.options.target
						}
					)
				}
		}
		)
	}
)
