steal(
	'sigma/lib'
,	'sigma/util'
).then(
	'bootstrap/js/bootstrap-tooltip.js'
).then(
	'bootstrap/js/bootstrap-popover.js'
).then(
	function()
	{
		can.Control(
			'Sigma.Editable'
		,	{
				defaults:
				{
					views:
					{
						text: './views/text.mustache'
					}
				}
			}
		,	{
				init: function(element,options)
				{
					this.$editpop
					=	can.view(
							options.views[options.type]
						,	options
						)
					
					element
						.popover(
							{
								placement:	this.options.placement || 'top'
							,	content: this.$editpop
							,	title: this.options.title || 'Editar'
							,	html: true
							}
						)
				}
			}
		)
	}
)