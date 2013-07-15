steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
,	'sigma/plugins'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Control.Groups'
		,	{
				defaults:
				{
					view: false
				,	target: false
				,	view_modal:false
				,	modal: false
				}
			}
		,	{
				'.add-group click': function(el,ev)
				{
					can.trigger(
						this.element
					,	'browse'
					,	{
							target: this.options.modal
						,	link: el.data('link')
						,	options:
							{
								view: this.options.view_modal
							,	bindings:
								[
									{
										selector:	'.save-group'
									,	event:		'click'
									,	who:		this.element
									,	who_event:	'save-group'
									,	what:		'form_data'
									}
								]
							}
						}
					)
				}

			,	' save-group': function(el,ev,form_data)
				{
					var	data
					=	this.options.data
					data
						.create(
							data.getHref()
						,	form_data.query
						,	'group'
						)
				}

			,	'.search keyup': function(el,ev)
				{
					if	(ev.keyCode == 13)
					{
						var	data
						=	this.options.data
						can.trigger(
							this.element
						,	'browse'
						,	{
								target:	this.options.target
							,	data:	data
											.constructor
												.filter(
													data.getHref()
												,	can.getFormData(el.parents('form')).query
												,	data.rel
												)
							}
						)
					}
				}
			}
		)
	}
)
