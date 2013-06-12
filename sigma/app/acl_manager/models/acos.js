steal(
	'sigma/models/model.js'
).then(
	function()
	{
		Sigma.Model.HAL.Collection(
			'Sigma.Model.HAL.ACOS'
		,	{}
		,	{}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.ACO'
		,	{}
		,	{}
		)
	}
)