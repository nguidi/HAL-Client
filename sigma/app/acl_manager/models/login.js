steal(
	'sigma/models'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Signin'
		,	{}
		,	{
				getTopbar: function()
				{
					return	this.links.get('profile')
						&&	this.links.get('profile').links.get('topbar')
				}
			,	getFooter: function()
				{
					return	this.links.get('profile')
						&&	this.links.get('profile').links.get('footbar')
				}
			,	getContent: function()
				{
					return	this.links.get('profile')
						&&	this.links.get('profile').links.get('home')
				}
			}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Signout'
		,	{}
		,	{}
		)
	}
)