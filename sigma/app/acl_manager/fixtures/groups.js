steal(
	'can/util/fixture'
,	'sigma/util/hal_builder.js'
,	'./fixtures_data.js'
,	function()
	{
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
							.toJSON()
			}
		)
	}
)