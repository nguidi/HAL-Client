steal(
	'sigma/models/model.js'
).then(
	function()
	{
		Sigma.Model.HAL.Collection(
			'Sigma.Model.HAL.Contents'
		,	{}
		,	{}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Content'
		,	{}
		,	{}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Home'
		,	{}
		,	{}
		)
	}
)