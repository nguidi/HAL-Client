steal(
	'can/util/fixture'
,	'sigma/util/hal_builder.js'
,	function()
	{
		can.fixture(
			'GET /api/menus/1'
		,	function()
			{
				var	hal_options_menu2
				=	[
						new	HAL_Resource(
								{
									id: 5
								,	title: "Submenu Opcion 1"
								}
							,	'api/option/5'
							)
					,	new	HAL_Resource(
								{
									id: 6
								,	title: "Submenu Opcion 2"
								}
							,	'api/option/6'
							)
					]
				,	hal_options_menu1
				=	[
						new	HAL_Resource(
								{
									id: 1
								,	title: "Opcion 1"
								}
							,	'api/option/1'
							)
					,	new	HAL_Resource(
								{
									id: 2
								,	title: "Opcion 2"
								}
							,	'api/option/2'
							)
					,	new	HAL_Resource(
								{
									id: 3
								,	title: "Opcion 3"
								}
							,	'api/option/3'
							)
					,	new	HAL_Resource(
								{
									id: 4
								,	title: "Opcion 4"
								}
							,	'api/option/4'
							)
							.curies('show')
							.link('show:submenus','/menus/1/options')
							.embed(
								'submenus'
							,	new HAL_Collection(
										hal_options_menu2
									,	'api/options/4/submenu'
									)
							)
					]

				return	new HAL_Resource(
								{
									id: 1
								,	title: "Menu Demo"
								}
							,	'/api/menus/1'
							)
							.curies('show')
							.link('show:options','/menus/1/options')
							.embed(
								'options'
							,	new HAL_Collection(
										hal_options_menu1
									,	'api/menus/1/options'
									)
							).toJSON()
			}
		)
	}
)