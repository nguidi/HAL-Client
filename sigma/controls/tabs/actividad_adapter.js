steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Tabs'
		,	{}
		,	{
				getNombre:function()
					{
						return this.embedded.attr('id_template')
					}
			,	getTabs:function()
					{
						return this.embedded.attr('template_sections').embedded.collection
					}
			,	getDatosBasicos:function()
					{
					return	new Array(
								this.attr('description')
							)
					}
			,	getHref:function()
					{
						return	this.links.attr('self.href')
					}
			// ,	getNombre:function()
			// 		{
			// 			return	this.embedded.attr('nombre_programa')
			// 		}
			,	getTipoProceso:function()
					{
						return	this.embedded.attr('tipo_proceso').attr('tipo_proceso')
					}
			}

		)

		can.Model.List( 'Sigma.Model.HAL.Tabs.List');
	}
)
