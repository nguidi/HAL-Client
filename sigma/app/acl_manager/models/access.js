steal(
	'sigma/models'
).then(
	function()
	{
		Sigma.Model.HAL.Collection(
			'Sigma.Model.HAL.Access.Collection'
		,	{}
		,	{
				access: function()
				{
					return	this.getCollection()
				}
			}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Access'
		,	{}
		,	{}
		)
	}
)