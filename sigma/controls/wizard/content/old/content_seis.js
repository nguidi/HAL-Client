steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	'sigma/stock/controls/wizard/content/content.js'
).then(
	function() {

		Sigma.HypermediaControl(
			'Sigma.Controls.Wizard.Content.Seis'
		,	{
				defaults:
				{
					view_init:		false
				,	view_index:		false
				,	target:			false
				}
			}
		,	{
				' form_done': function()
					{
						this.options.$form
						=	this.element.find('form').clone()

						this.element.find('form')
							.empty()
							.append(
								can.view(
									this.options.view_index
								,	new can.Observe(
										{
											id:		'step1'
										,	index:	'1.1'
										,	label:	'Seleccione un Campo Extra'
										}
									)
								)
							)

						this.element.find('form')
					}
			}
		)
	}
)
