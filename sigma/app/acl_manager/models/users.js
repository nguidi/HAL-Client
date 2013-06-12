steal(
	'sigma/models/model.js'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.User'
		,	{}
		,	{}
		)
	}
)