steal(
	'sigma/models'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Permissions'
		,	{ }
		,	{
				access: function()
				{
					return	this.links.get('access')
				}
			}
		)

		Sigma.Model.HAL.Collection(
			'Sigma.Model.HAL.Permissions.Collection'
		,	{ }
		,	{
				permissions: function()
				{
					return	this.embedded.attr('collection')
				}
			}
		)
	}
)