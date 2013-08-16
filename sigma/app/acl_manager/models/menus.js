steal(
	'sigma/models'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Menus'
		,	{}
		,	{
				options: function()
				{
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
			'Sigma.Model.HAL.Options'
		,	{}
		,	{
				submenus: function()
				{
					return	this.links.get('submenus')
						&&	this.links.get('submenus').getCollection()
				}
			,	link: function()
				{
					return	this.links.get_link_by_rel(can.underscore(this.title))
					||	this.links.get_link_by_rel('self')
				}
			}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Topbars'
		,	{}
		,	{
				menu: function()
				{
					return	this.links.get('menu')
				}
			,	brand: function()
				{
					return	this.links.get('brand')
				}
			}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Footbar'
		,	{}
		,	{
				menu: function()
				{
					return	this.links.get('menu')
				}
			}
		)
	}
)