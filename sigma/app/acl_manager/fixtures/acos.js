steal(
	'can/util/fixture'
,	'sigma/util/hal_builder.js'
,	'./fixtures_data.js'
,	function()
	{

		buscar_aco = function(filter,id)
			{
				console.log(filter,id)
				return can.map(
					_.filter(
						acos
					,	function(aco_find,key_aco)
						{
							return filter
							?	_.contains(id,aco_find.id)
							: 	true
						}
					)
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
		}
		can.fixture(
			'GET /api/data/acos'
		,	function()
			{				
				return	new HAL_Collection( 
					buscar_aco()
				,	'/api/data/groups'
				)
				.toJSON()
			}
		)

		can.fixture(
			'GET groups/{id}/acos'
		,	function(data)
			{	
				return	new HAL_Collection( 
					buscar_aco(
						true
					,	can.map(
							_.filter(
								acos_groups
							,	function(id_ag)
								{
									return data.data.id == id_ag.id_group
								}
							)
						,	function(aco_group)
							{
								return aco_group.id_aco
							}
						)
					)
				,	'/api/data/groups'
				)
				.toJSON()
			}
		)

		can.fixture(
			'GET acos/{id}/assocs'
		,	function(data)
			{		
				console.log(data)		
				return	new HAL_Collection( 
					buscar_aco(
						true
					,	can.map(
							_.filter(
								acos_assocs
							,	function(id_aa)
								{
									return data.data.id == id_aa.id_aco
								}
							)
						,	function(aco_assoc)
							{
								return aco_assoc.id_aco_assoc
							}
						)
					)
				,	'/api/data/groups'
				)
				.toJSON()
			}
		)
	}
)