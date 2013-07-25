steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Hypermedia.Comments'
		,	{
				defaults: {
					view : false
				}
			}
		,	{
				_render_content: function(data)
				{
					var exists = this.element.hasClass('comments') 
					if (!exists)
						can.addClass(
							this.element
						,	'comments well media span5'
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