steal(
	'sigma/models/model.js'
).then(
	function()
	{
		Sigma.Model.HAL.Collection(
			'Sigma.Model.HAL.Permissions'
		,	{}
		,	{
				permissions: function()
				{
					return	this.getCollection()
				}
			}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Permission'
		,	{}
		,	{
				access: function()
				{
					return	this.links.get('access')
				}
			}
		)
	}
)