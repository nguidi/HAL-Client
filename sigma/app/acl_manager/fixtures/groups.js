steal(
	'can/util/fixture'
,	'sigma/util/hal_builder.js'
,	'./fixtures_data.js'
,	function()
	{
		var generate_group
		=	function(g)
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

		can.fixture(
			'POST /api/data/groups'
		,	function(original)
			{
				switch(original.data.action)
				{
					case "create":
						var	g
						=	_.object(
								['id','group']
							,	[groups.length+1,_.find(original.data.query,function(q){return q.key=='group'}).value]
							)
						groups.push(g)
						var	p
						=	_.map(
								_.find(original.data.query,function(q){return q.key=='permissions'}).value
							,	function(p,i)
								{
									return	_.object(
												['id','id_aro_group','id_permission']
											,	[aros_groups_permissions.length+parseInt(p)+1,g.id,parseInt(p)]
											)
								}
							)
						aros_groups_permissions
						=	_.union(
								aros_groups_permissions
							,	p
							)
						var toReturn
						=	generate_group(g)
						break;
					case "filter":
						var	toReturn
						=	new HAL_Collection(
								can.map(
									_.filter(
										groups
									,	function(fg,i)
										{
											return	_.filter(
														original.data.query
													,	function(dq,i)
														{
															return	fg[dq.key]==dq.value
														}
													).length == original.data.query.length
										}
									)
								,	function(g)
									{
										return	generate_group(g)
									}
								)
							,	'/api/data/groups'
							)
							.curies(['show','create'])
							.link('show:permissions','/api/data/permissions')
							.link('create:groups','api/adata/groups')
						break;
					case "find":
						console.log("NOTFIND")
						break;
					default:
						console.log("NOT",original.data)
						break;
				}
				return	toReturn
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
												.link('show:acos','groups/'+g.id+'/acos')
												.link('show:perfiles','groups/'+g.id+'/perfiles')
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
												.embed(
													'acos'
												,	new HAL_Collection(
															can.map(
																_.filter(
																	acos
																,	function(a,key)
																	{
																		return	_.contains(
																					can.map(
																						_.filter(
																							acos_groups
																						,	function(ag)
																							{
																								return	ag.id_group == g.id
																							}
																						)
																					,	function(fag)
																						{
																							return	fag.id_aco
																						}
																					)
																				,	a.id
																				)
																	}
																)
															,	function(a)
																{
																	return	new HAL_Resource(
																					a
																				,	'/api/data/acos/'+a.id
																				)
																}
															)
														,	'groups/'+g.id+'/acos'
														)
												)
												.embed(
													'perfiles'
												,	new HAL_Collection(
															can.map(
																_.filter(
																	profiles
																,	function(p,key)
																	{
																		return	_.contains(
																					can.map(
																						_.filter(
																							aros_groups
																						,	function(ag)
																							{
																								return	ag.id_group == g.id
																							}
																						)
																					,	function(fp)
																						{
																							return	fp.profile
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
														,	'groups/'+g.id+'/perfiles'
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