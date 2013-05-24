steal(
	'can'
).then(
	function()
	{
		window.appendIf
		=	function(el, tag)
			{
				if(el.is(tag) || !tag)
					return el
			var	res
			=	el.find(tag)
				if(res && res.length)
					return res
			return	el.append(can.$('<' + tag + '>')).find(tag)
			}
		can.reduce
		=	function(list,callback,initial)
			{
				if(!can.isArray(list))
						throw 'array list expected'
					if(!can.isFunction(callback))
						throw 'function callback expected'
				var	len
				=	list.length
				,	has_initial
				=	initial!==undefined
				,	acc
				=	has_initial
						?initial
						:list[0]
				,	i
					=	has_initial?0:1
					if(len === 0 && !hasSeed)
						throw 'empty && no initial'
					for (; i < len; i++ )
					{
						acc
						=	callback
							.call(
								list
							,	acc
							,	list[i]
							)
					}
			return	acc
			}
		window.NS
		=	function(namespace)
			{
			return	can
				.reduce(
					namespace.split('.')
				,	function(parent,part)
					{
						parent[part]
						=	parent[part] || {}
					return	parent[part]
					}
				,	window
				)
			}
		NS('Sigma.stock')
		NS('Sigma.Model')
		Sigma.stock
		.views
		=	function(path)
			{
			return	steal.idToUri(path).path
			}
		can.isEmptyResource
		=	function(resource)
			{
				return	_.isEmpty(resource)
					||	_.isEqual(
							resource.code
						,	404
						)
			}
		can.getFormData
		=	function(form)
			{
				var	raw_data
				=	can.deparam(form.serialize())
				,	toReturn
				=	new Array()
				can.each(
					raw_data
				,	function(raw_value,raw_key)
					{
						if	(raw_value != "Seleccione una opción" && !_.isEmpty(raw_value))
							toReturn
								.push(
									{
										key:	raw_key
									,	value:	raw_value
									}
								)
					}
				)
				return toReturn
			}
		can.cleanForm
		=	function(form)
			{
				_.each(
					form
				,	function(f)
					{
						f.reset()
					}
				)
			}
	}
)
