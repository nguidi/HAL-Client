steal(
	'can/util/fixture'
,	'sigma/util/hal_builder.js'
,	'./fixtures_data.js'
,	function()
	{
		can.fixture(
			'GET /api/data/permissions'
		,	function()
			{				
				return	new HAL_Collection(
								can.map(
									permissions
								,	function(p)
									{
										return	new HAL_Resource(
													p
												,	'/api/data/permissions/'+p.id
												)
												.curies('show')
												.link('show:access','permissions/'+p.id+'/access')
												.embed(
													'access'
												,	new HAL_Collection(
															can.map(
																_.filter(
																	access
																,	function(a,key)
																	{
																		return	a.id_permission == p.id
																	}
																)
															,	function(f)
																{
																	return	new HAL_Resource(
																					f
																				,	'/api/data/access/'+f.id
																				)
																}
															)
														,	'permissions/'+p.id+'/access'
														)
												)
									}
								)
							,	'/api/data/permissions'
							)
							.toJSON()
			}
		)
	}
)