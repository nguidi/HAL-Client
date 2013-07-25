steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.SRU.Charts'
		,	{
				defaults:
				{
				}
			}
		,	{
				_render_content : function(data)
				{
					//console.log(data)			
					var self = this
					can.append(
						self.element
					,	can.view(
							self.options.view_home
						,	data
						)
					)
					if(self.options.vew_chart)
						can.each(
							data.embedded
						,	function()
							{
								can.append(
									self.element
										.find('.charts')
								,	can.view(
										self.options.view_chart
									,	this
									)
								)
							}
						)
				}
			}
		)
	}
)