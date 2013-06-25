steal(
	'can/util/fixture'
,	'sigma/util/hal_builder.js'
,	'./fixtures_data.js'
,	function()
	{
		can.fixture(
			'GET /api/data/acos'
		,	function()
			{				
				return	new HAL_Collection(
								can.map(
									acos
								,	function(a)
									{
										return	new HAL_Resource(
													a
												,	'/api/data/acos/'+a.id
												)
												.curies('show')
												.link('show:assocs','acos/'+a.id+'/assocs')
												.embed(
													'assocs'
												,	new HAL_Collection(
															can.map(
																_.filter(
																	acos
																,	function(aa,key)
																	{
																		return	_.contains(
																					can.map(
																						_.filter(
																							acos_assocs
																						,	function(aaa)
																							{
																								return	aaa.id_aco == a.id
																							}
																						)
																					,	function(faaa)
																						{
																							return	faaa.id_aco_assoc
																						}
																					)
																				,	aa.id
																				)
																	}
																)
															,	function(faa)
																{
																	return	new HAL_Resource(
																					faa
																				,	'/api/data/acos/'+faa.id
																				)
																}
															)
														,	'acos/'+a.id+'/assocs'
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