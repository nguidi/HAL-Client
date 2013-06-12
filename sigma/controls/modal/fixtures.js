steal(
	'can/util/fixture'
,	'sigma/util/hal_builder.js'
,	function()
	{
		can.fixture(
			'GET /api/modals/1'
		,	function()
			{
				return	new HAL_Resource(
								{
									id: 1
								,	title: "Modal 1"
								}
							,	'/api/menus/1'
							)
							.curies('show')
							.link('show:options','/menus/1/options')
							.link('show:content','/menus/1/content')
							.embed(
								'options'
							,	new HAL_Collection(
										[
											new	HAL_Resource(
													{
														id: 1
													,	title: "Continuar"
													,	type: "ok"
													}
												,	'/api/options/1'
												)
										,	new	HAL_Resource(
													{
														id: 2
													,	title: "Cancelar"
													,	type: "remove"
													}
												,	'/api/options/1'
												)
										]
									,	'/api/modals/1/options'
									)
							)
							.embed(
								'content'
							,	new	HAL_Resource(
										{
											id: 1
										,	title: "Modal Content Title"
										,	description: "Modal Content Description"
										}
									,	'/api/modals/1/content'
									)
							).toJSON()
			}
		)
	}
)