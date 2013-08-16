steal(
	'can/util/fixture'
,	'sigma/util/hal_builder.js'
).then(
	function()
	{
		var	grupos
		=	[{name:'Grupo 1'},{name: 'Grupo 2'}]
		,	campos_extras_a
		=	[
				[{name: 'Campo 1', tipo_campo: 'texto', es_indicador: true}]
			,	[{name: 'Campo 6', tipo_campo: 'integer', es_indicador: false}
				,{name: 'Campo 8', tipo_campo: 'double', es_indicador: false}]
			]

		var hal_groups
		=	new HAL_Collection(
					_.map(
						grupos
					,	function(g,i)
						{
							return	new	HAL_Resource(
											g
										,	' api/data/grupos/'+(i+1)
										)
										.curies('list')
										.link('list:campos_extras','api/data/campos_extras/'+(i+1)+'/grupos')
										.embed(
											'campos_extras'
										,	new HAL_Collection(
													_.map(
														campos_extras_a[i]
													,	function(g,i)
														{
															return	new	HAL_Resource(
																			g
																		,	' api/data/campos_extras/'+(i+1)
																		)
														}
													)
												,	'api/data/campos_extras'
												)
										)
						}
					)
				,	'api/data/grupos'
				)

		can.fixture(
			'GET api/data/drageable/1'
		,	function()
			{
				return	new	HAL_Resource(
								{
									id: 1
								}
							,	'api/data/drageable/1'
							)
							.curies('list')
							.link('list:groups','api/data/grupos')
							.embed('groups',hal_groups)
							.toJSON()
			}
		)
	}
)
