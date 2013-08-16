steal(
	'sigma/models'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Permissions'
		,	{
				findAll: function()
				{
					return	this.Fetch('http://trabajando:3003/api/data/permissions')
								.pipe(
									function(raw)
									{
										return	raw.permissions()
									}
								)
				}
			}
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