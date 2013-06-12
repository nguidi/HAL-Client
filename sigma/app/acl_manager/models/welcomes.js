steal(
	'sigma/models/model.js'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Welcome'
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