steal(
	'sigma/models'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Groups'
		,	{}
		,	{
				permissions: function()
				{
					return	this.links.get('permissions')
						&&	this.links.get('permissions').getCollection()
				}
			,	acos: function()
				{
					return	this.links.get('acos')
						&&	this.links.get('acos').getCollection()
				}
			,	perfiles: function()
				{
					return	this.links.get('perfiles')
						&&	this.links.get('perfiles').getCollection()
				}
			,	next: function()
				{
					return	this.links.attr('show:acos')
				}
			}
		)
		
		Sigma.Model.HAL.Collection(
			'Sigma.Model.HAL.Groups.Collection'
		,	{ }
		,	{
				groups: function()
				{
					return	this.getCollection()
				}
			,	add: function()
				{
					return	this.links.attr('show:permissions')
				}
			,	create_groups: function()
				{
					return	this.links.attr('create:groups')
				}
			}
		)
	}
)