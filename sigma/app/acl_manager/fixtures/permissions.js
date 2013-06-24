steal(
	'can/util/fixture'
,	'sigma/util/hal_builder.js'
,	function()
	{
		can.fixture(
			'GET /api/acl/permissions'
		,	function()
			{
				var	view_access
				=	new HAL_Collection(
							[
								new HAL_Resource(
										{
											id: 1
										,	access: "show"
										}
									,	'/api/acl/access/1'
									)
							,	new HAL_Resource(
										{
											id: 2
										,	access: "list"
										}
									,	'/api/acl/access/2'
									)
							,	new HAL_Resource(
										{
											id: 3
										,	access: "find"
										}
									,	'/api/acl/access/3'
									)
							,	new HAL_Resource(
										{
											id: 4
										,	access: "filter"
										}
									,	'/api/acl/access/4'
									)
							]
						,	'/api/acl/permissions/1/access'
						)
				
				return	new HAL_Collection(
								[
									new HAL_Resource(
											{
												id: 1
											,	permission: "view"
											}
										,	'/api/acl/permissions/1'
										)
										.curies('show')
										.link('show:access','permissions/1/access')
										.embed('access',view_access)
								,	new HAL_Resource(
											{
												id: 2
											,	permission: "update"
											}
										,	'/api/acl/permissions/2'
										)
								,	new HAL_Resource(
											{
												id: 3
											,	permission: "create"
											}
										,	'/api/acl/permissions/3'
										)
								,	new HAL_Resource(
											{
												id: 4
											,	permission: "delete"
											}
										,	'/api/acl/permissions/4'
										)
								]
							,	'/api/acl/permissions'
							)
							.toJSON()
			}
		)
	}
)