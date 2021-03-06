steal(
	'can/util/fixture'
,	'sigma/util/hal_builder.js'
,	'./fixtures_data.js'
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
									.curies('show')
									.link('show:content:aros','/api/data/aros')
							,	new	HAL_Resource(
										{
											id: 2
										,	title: "ACOS"
										}
									,	'/api/data/options/2'
									)
									.curies('show')
									.link('show:content:acos','/api/data/acos')
							,	new	HAL_Resource(
										{
											id: 3
										,	title: "Grupos"
										}
									,	'/api/data/options/3'
									)
									.curies('show')
									.link('show:content:grupos','/api/data/groups')
							,	new	HAL_Resource(
										{
											id: 4
										,	title: "Asignaciones"
										}
									,	'/api/data/options/4'
									)
									.curies('show')
									.link('show:content:asignaciones','/api/data/groups')
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
				var user
				=	_.find(
						users
					,	function(u)
						{
							return	_.isEqual(
										_.filter(
											original.data.query
										,	function(q)
											{
												return	_.isEqual(u[q.key],q.value) 
											}
										).length
									,	original.data.query.length
									)
						}
					)

				return	_.isDefined(user)
						?	new	HAL_Resource(
										user
									,	'/api/data/users/'+user.id
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