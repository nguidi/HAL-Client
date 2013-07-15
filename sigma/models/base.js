steal(
	'can/observe'
,	'sigma/lib'
,	'sigma/util'
).then(
	function()
	{
		Sigma.Model.HAL
		=	new	can.Observe(
					{
						model_by_rel: function(rel)
						{
							return	this[can.capitalize(can.camelCase(rel))]
								||	this[can.capitalize(can.camelCase(rel+'s'))]
						}
					,	collection_by_rel: function(rel)
						{
							return	this[can.capitalize(can.camelCase(rel))]
						}
					,	link_by_type: function(type)
						{
							return	this[can.capitalize(can.camelCase(type))]
						}
					,	lookup:	function(what,relation,index_or_name)
						{
							return 	_.isUndefined(index_or_name) || !_.isArray(what[relation])
									?	what[relation]
									:	can.isNumeric(index_or_name)
											?	what[relation][index_or_name]
											:	_.find(
													what[relation]
												,	function(item)
													{
														return item.name == index_or_name
													}
												)
						}
					}
				)
	}
)