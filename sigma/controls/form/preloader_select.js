steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Controls.PreloaderSelect'
		,	{
				defaults:{
					view_option: '//stock/controls/form/views/optionTemplate.mustache'
				,	selector: false
				,	value_field: false
				}
			}
		,	{
				_render_content: function(data)
				{	
					var self=this
					can.each(
						data.embedded.collection
					,	function(item)
						{
							can.$(self.options.selector)
								.append(
									can.view(
										self.options.view_option
									,	{
											value: item.attr('id')
										,	name: item.attr(self.options.value_field)
										}
									)
								)
						}
					)
				}
			}
		)
	}
)
