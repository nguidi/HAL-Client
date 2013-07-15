steal(
	'sigma/models'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Users'
		,	{}
		,	{
				submenu: function()
				{
					return	_.isDefined(this.links.attr('show:profile'))
						&&	_.isDefined(this.links.attr('api:signout'))
				}
			,	config: function()
				{
					return	this.links.attr('show:profile')
				}
			,	signout: function()
				{
					return	this.links.attr('api:signout')
				}
			}
		)
	}
)