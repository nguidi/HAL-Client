steal(
	'sigma/models/model.js'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Menu'
		,	{}
		,	{
				options: function()
				{
					console.log("options ",this.links.get('options').getCollection())
					return	this.links.get('options')
						&&	this.links.get('options').getCollection()
				}
			,	user: function()
				{
					return	this.links.get('user')
				}
			}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.User'
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

		Sigma.Model.HAL.Collection(
			'Sigma.Model.HAL.Options'
		,	{}
		,	{}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Option'
		,	{}
		,	{
				submenus: function()
				{
					return	this.links.get('submenus')
						&&	this.links.get('submenus').getCollection()
				}
			}
		)

		Sigma.Model.HAL.Menu(
			'Sigma.Model.HAL.Topbar'
		,	{}
		,	{}
		)
	}
)