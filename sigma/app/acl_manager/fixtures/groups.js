steal(
	'can/util/fixture'
,	'sigma/util/hal_builder.js'
,	'./fixtures_data.js'
,	function()
	{
		can.fixture(
			'POST /api/data/groups'
		,	function(original)
			{
				var g
				=	new Object()
				switch(original.data.action)
				{
					case "create":
						g
						=	_.object(
								['id','group']
							,	[groups.length+1,_.find(original.data.query,function(q){return q.key=='group'}).value]
							)
						groups.push(g)
						break;
					case "filter":
						console.log("NOT")
						break;
					default:
						console.log("NOT")
						break;
				}
				return	new	HAL_Resource(
								g
							,	'/api/data/groups/'+g.id
							)
							.curies('show')
							.link('show:permissions','groups/'+g.id+'/permissions')
							.toJSON()

			}
		)

		can.fixture(
			'GET /api/data/groups'
		,	function()
			{				
				return	new HAL_Collection(
								can.map(
									groups
								,	function(g)
									{
										return	new HAL_Resource(
													g
												,	'/api/data/groups/'+g.id
												)
												.curies('show')
												.link('show:permissions','groups/'+g.id+'/permissions')
												.embed(
													'permissions'
												,	new HAL_Collection(
															can.map(
																_.filter(
																	permissions
																,	function(p,key)
																	{
																		return	_.contains(
																					can.map(
																						_.filter(
																							aros_groups_permissions
																						,	function(agp)
																							{
																								return	agp.id_aro_group == g.id
																							}
																						)
																					,	function(fagp)
																						{
																							return	fagp.id_permission
																						}
																					)
																				,	p.id
																				)
																	}
																)
															,	function(p)
																{
																	return	new HAL_Resource(
																					p
																				,	'/api/data/permissions/'+p.id
																				)
																}
															)
														,	'groups/'+g.id+'/permissions'
														)
												)
									}
								)
							,	'/api/data/groups'
							)
							.curies(['show','create'])
							.link('show:permissions','/api/data/permissions')
							.link('create:groups','api/adata/groups')
							.toJSON()
			}
		)
	}
)