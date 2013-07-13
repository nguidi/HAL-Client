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
				_render_content:function(data)
				{
					this._super(data)
				}
			,	'.add-group click': function(el,ev)
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
					Sigma.Model.HAL.Group
							.create(
								data.getHref()
							,	_.filter(
									form_data.query
								,	function(q,i)
									{
										return	q.key != 'permisos'
									}
								)
							,	'group'
							).then(
								function(group)
								{
									console.log("SAVE",group)
								}
							)

				}
			}
		)
	}
)
