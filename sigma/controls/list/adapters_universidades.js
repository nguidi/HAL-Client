steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.List'
		,	{}
		,	{
				getList:function()
				{
					console.log("Adapter universidades embedded: ",this.embedded)
					return this.embedded.attr('universidades').embedded.collection
				}
			}
		)

		can.Model.List( 'Sigma.Model.HAL.Searcher.List');
	}
)
