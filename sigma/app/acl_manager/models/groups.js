steal(
	'sigma/models/model.js'
).then(
	function()
	{
		Sigma.Model.HAL.Collection(
			'Sigma.Model.HAL.Groups'
		,	{}
		,	{
				groups: function()
				{
					return	this.getCollection()
				}
			}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Group'
		,	{}
		,	{
				permissions: function()
				{
					return	this.links.get('permissions')
						&&	this.links.get('permissions').getCollection()
				}
			}
		)
	}
)