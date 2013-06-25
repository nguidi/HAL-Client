steal(
	'can/util/fixture'
,	'sigma/util/hal_builder.js'
,	function()
	{
		can.fixture(
			'GET /api/data/welcomes/1'
		,	function()
			{
				return	new HAL_Resource(
								{
									id: 1
								,	app_name: "ACL Manager"
								,	title: "ACL Manager"
								,	welcome: "Bienvenidos al Access Control List Manager."
								}
							,	'/api/data/welcomes/1'
							)
							.curies('api')
							.link(
								'api:signin'
							,	{
									name: "signin",
									href: "/signin"
								}
							)
							.toJSON()
			}
		)

		var	topbar_resource
		=	new HAL_Resource(
					{
						id: 1
					,	title: "ACL Manager"
					}
				,	'/api/data/menus/1'
				)
				.curies('show')
				.link('show:options','/menus/1/options')
				.embed(
					'options'
				,	new HAL_Collection(
							[
								new	HAL_Resource(
										{
											id: 1
										,	title: "AROS"
										}
									,	'/api/data/options/1'
									)
							,	new	HAL_Resource(
										{
											id: 2
										,	title: "ACOS"
										}
									,	'/api/data/options/2'
									)
							,	new	HAL_Resource(
										{
											id: 3
										,	title: "Control"
										}
									,	'/api/data/options/3'
									)
							]
						,	'/api/data/menus/1/options'
						)
				)
		,	home_resource
		=	new	HAL_Resource(
					{
						id: 1
					,	title: "ACL Manager"
					}
				,	'/api/data/menus/1'
				)
		,	footer_resource
		=	new	HAL_Resource(
					{
						id: 1
					,	title: "ACL Manager"
					,	copyright: "© Copyright 2013 Sigma-IT Solutions"
					}
				,	'/api/data/footers/1'
				)

		can.fixture(
			'POST /api/signin'
		,	function(original)
			{
				return	_.isEqual(
							_.filter(
								original.data.query
							,	function(query)
								{
									return	(query.key == 'username')
											?	query.value != 'nguidi'
											:	query.value != '12345'
								}
							).length
						,	1
						)	?	new	HAL_Resource(
										{
											id: 1
										,	profile: 1
										,	username: 'nguidi'
										,	password: '12345'
										}
									,	'/api/data/users/1'
									)
									.curies('show')
									.link('show:topbar','/users/1/topbar')
									.link('show:content:home','/users/1/home')
									.link('show:footer','/users/1/footer')
									.embed('topbar',topbar_resource)
									.embed('home',home_resource)
									.embed('footer',footer_resource)
									.toJSON()
							:	new	HAL_Resource(
										{
											code: 404
										,	status: "Not Found"
										}
									,	'/api/status_codes/404'
									)
									.toJSON()
			}
		)
	}
)