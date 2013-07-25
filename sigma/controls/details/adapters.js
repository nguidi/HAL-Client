steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Resource.Details'
		,	{
				getRoot: function(id)
				{
					return this.Fetch('fixture/details/'+id,'details')
				}
			}
		,	{}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Resource.Comments'
		,	{
				actions_rel: 'actions'
			,	getRoot: function(id)
				{
					return this.Fetch('fixture/comments/'+id,'reply')
				}
			}
		,	{
				getActions:function()
					{
					return	this.constructor.actions_rel
						&&	this.links.attr(this.constructor.actions_rel)
					}
				}
		)
		var DrillDownAdapter
			=	Sigma.Model.HAL.Resource(
					{
						drilldown_rel: false
					}
				,	{
						getDrilldown:function()
							{
							return	this.constructor.drilldown_rel
								&&	this.embedded.attr(this.constructor.drilldown_rel)
							}
					}
				)

		DrillDownAdapter(
			'Sigma.Model.HAL.Resource.DrillDown'
		,	{
				drilldown_rel : 'drilldown'
			,	getRoot: function(url)
					{
						return this.Fetch(url,'drilldown')
					}
			}
		,	{}
		)
	}
)