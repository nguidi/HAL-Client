steal(
	'can/util/fixture'
,	'sigma/util/hal_builder.js'
,	function()
	{
		can.fixture(
			'GET /api/personas?page={{page}}&ipp={ipp}&type={{type}}'
		,	function(original)
			{
				console.log(original)
				var personas
				=	new Array()
				,	i=1
				while (i < 100)
				{
					personas
						.push(
							{
								id: i
							,	nombre: 'Nombre '+i
							,	apellido: 'Appelido '+i
							}
						)
					i++
				}
				return	new HAL_Collection(
								can.map(
									personas
								,	function(p,i)
									{
										return	new HAL_Resource(
														p
													,	'api/personas/'+(i+1)
													)
									}
								)
							,	'/api/personas'
							)
							.toJSON()
			}
		)
	}
)