Sigma.HypermediaControl(
	'Sigma.Hypermedia.Actions'
,	{
		defaults: {
			view : false
		}
	}
,	{
		_render_content: function(data)
		{			
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