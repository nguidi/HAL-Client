steal(
	'sigma/models/model.js'
).then(
	function()
	{
		Sigma.Model.HAL.Collection(
			'Sigma.Model.HAL.Footers'
		,	{}
		,	{}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Footer'
		,	{}
		,	{}
		)
	}
)