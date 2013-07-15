steal(
	'sigma/models'
).then(
	function()
	{
		Sigma.Model.HAL.Collection(
			'Sigma.Model.HAL.Assocs.Collection'
		,	{}
		,	{
				assocs: function()
				{
					return	this.getCollection()
				}
			}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Assocs'
		,	{}
		,	{
				assocs: function()
				{
					return	this.getCollection()
				}
			}
		)

		Sigma.Model.HAL.Collection(
			'Sigma.Model.HAL.Acos.Collection'
		,	{}
		,	{
				acos: function()
				{
					return	this.getCollection()
				}
			}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Acos'
		,	{}
		,	{
				assocs: function()
				{
					return	this.links.get('assocs')
						&&	this.links.get('assocs').getCollection()
				}
			,	permissions: function()
				{
					return	this.links.get('permissions')
						&&	this.links.get('permissions').getCollection()
				}
			,	next: function()
				{
					return	this.links.attr('show:assocs')
				}
			}
		)
	}
)