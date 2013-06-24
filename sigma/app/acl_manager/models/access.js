steal(
	'sigma/models/model.js'
).then(
	function()
	{
		Sigma.Model.HAL.Collection(
			'Sigma.Model.HAL.Access'
		,	{}
		,	{
				access: function()
				{
					return	this.getCollection()
				}
			}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Acces'
		,	{}
		,	{}
		)
	}
)