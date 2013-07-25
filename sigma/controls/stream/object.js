Sigma.HypermediaControl(
	'Sigma.Hypermedia.Object'
,	{
		defaults: {
			view : false
		}
	}
,	{
		_render_content: function(data)
		{
			var icon_align = (data.attr('icon_align')) ? data.attr('icon_align') : 'left'

			this.element.addClass('pull-'+icon_align)

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