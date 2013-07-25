steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Hypermedia.Details'
		,	{
				defaults: {
					view : false
				}
			}
		,	{
				_render_content: function(data)
				{
					var exists = this.element.hasClass('details') 
					if (!exists)
						can.addClass(
							this.element
						,	'details well media span5'
						)
					this._render_resource(data)

				}

			,	_render_resource: function(data) 
				{
					if (this.options.view)
						can.append(
							this.element
						,	can.view(
								this.options.view
							,	data
							)
						)
				}
			}
		)
	}
)