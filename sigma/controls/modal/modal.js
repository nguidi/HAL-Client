steal(
	'sigma/controls/hypermedia/control.js'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Control.Modal'
		,	{
				defaults:
				{
					view: false
				,	view_body: false
				}
			}
		,	{
				_render_content: function(data)
				{
					this.element.hide()
					this._super(data)
					can.append(
							this.element.find('.modal-body')
						,	can.view(
									this.options.view_body
								,	data.content()
								)
						)
				}

			,	'.remove click': function(el,ev)
				{
					this.hide()
				}

			,	show: function()
				{
					this.element.show('fast')
				}

			,	hide: function()
				{
					this.element.hide('fast')
				}
			}
		)
	}
)
