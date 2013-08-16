steal(
	'can/util/fixture'
,	'sigma/util/hal_builder.js'
).then(
    function()
    {
		can.fixture(
			'GET api/data/welcomes/1'
		,	function()
			{
				return	new	HAL_Resource(
								{
									id: 1
								,	title: "algo sobre la app para que quede mas lindo"
								,	welcome: "Bienvenidos"
								,	logo: "http://placehold.it/260x180"
								}
							,	'api/option/6'
							)
							.curies('api')
							.link('api:signin','/api/signin')
							.link('api:signout','/api/signout')
							.link('api:signup','/api/signup')
							.toJSON()
			}
		)

	}
)
