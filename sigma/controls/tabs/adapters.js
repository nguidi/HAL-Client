steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Tabs'
		,	{}
		,	{
				getTabs:function()
				{
					return	this.embedded.attr('tabs_form')
				}
			}
		)

		can.Model.List( 'Sigma.Model.HAL.Tabs.List');
	}
)
