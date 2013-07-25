steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Searcher'
		,	{}
		,	{
				getAdvance:function()
				{
					return	this.embedded.attr('fields_search')
				}
			,	getActions:function()
				{
					return this.embedded.attr('actions_search')
				}
			}
		)

		/*Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Content'
		,	{}
		,	{}
		)*/

		can.Model.List( 'Sigma.Model.HAL.Searcher.List');
	}
)
