steal(
	'sigma/models'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Welcomes'
		,	{}
		,	{
				signin: function()
				{
					return	this.links.attr('api:signin')
				}
			,	signout: function()
				{
					return	this.links.attr('api:signout')
				}
			,	signup: function()
				{
					return	this.links.attr('api:signup')
				}
			}
		)
	}
)