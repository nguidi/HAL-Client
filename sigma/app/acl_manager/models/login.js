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
					console.log(this.links.get('profile'), this.links, this.links.get('profile').links)

					return	this.links.get('profile')
						&&	this.links.get('profile').links.get('footbar')
				}
			,	getContent: function()
				{
					console.log(this.links,this.links.get('profile').links.get('home'))
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