steal(
	'can/util/fixture'
,	'sigma/util/hal_builder.js'
,	'sigma/models'
,	'sigma/lib/parseuri.js'
).then(
	function()
	{
		var	palabras
		=	can.map(
				['Hola','Como','Estas','Gato','Todo','Bien','gatin','gatito','forest','juan','franco']
			,	function(p,i)
				{
					return	new HAL_Resource(
									{
										id: i+1
									,	name: p
									}
								,	'/test/palabras/'+i+1
								)
				}
			)
		
		can.fixture(
			'GET /test/palabras'
		,	function()
			{
				return	new HAL_Collection(
								palabras
							,	'/test/palabras'
							)
							.toJSON()
			}
		)


		can.fixture(
			'GET /test/pageable_palabras?page={page}&ipp={ipp}&type={type}'
		,	function(original)
			{
				var	query
				=	parseUri(original.url).queryKey
				,	collection
				=	new HAL_Collection(
								_.filter(
									palabras
								,	function(p,i)
									{
										return	i	<	(query.page*query.ipp)
											&&	i	>=	(query.page*query.ipp - query.ipp)
									}
								)
							,	'/test/palabras'
							)

				switch(query.type)
				{
					case "pageable":
						if	(query.page*query.ipp < palabras.length)
							collection
								.link('next','/test/pageable_palabras?page='+(parseInt(query.page)+1)+'&ipp='+query.ipp+'&type=pageable')
						if	(query.page != 1)
							collection
								.link('prev','/test/pageable_palabras?page='+(parseInt(query.page)-1)+'&ipp='+query.ipp+'&type=pageable')
						break;
					case "scrollable":
						collection
							.link('more','/test/pageable_palabras?page='+(parseInt(query.page)+1)+'&ipp='+query.ipp+'&type=scrollable')
						break;
					default:
						collection
							.link('goto',{href: '/test/pageable_palabras?page={page}&ipp={ipp}&type=list'})
						break;
				}

				return	collection
							.toJSON()
			}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Palabras'
		,	{ }
		,	{ }
		)

		Sigma.Model.HAL.Collection(
			'Sigma.Model.HAL.Palabras.Collection'
		,	{ 
			}
		,	{
				getPage: function()
				{
					return	'Page'
				}
			}
		)

		var	template
		=	'<div id="{{id}}"></div>';
		var	fragment
		=	new can.Mustache(
					{
						text: template
					}
				)

		test(
			"Collection model"
		,	function()
			{
				stop();
				Sigma.Model.HAL.Palabras.fetch('/test/palabras','palabras')
				.then(
					function(data)
					{
						ok(data, "Resource OK");
						ok(data instanceof Sigma.Model.HAL.Palabras.Collection,'Resource Type OK')
						ok(data.getPage,'Custom Function OK')
						ok(data.embedded.attr('collection'),'Collection OK')
						ok(data.embedded.attr('collection.0'),'Resource from Collection OK')
						ok(data.embedded.attr('collection.0') instanceof Sigma.Model.HAL.Palabras,'Resource Type from Collection OK')
						can.append(
							can.$(document.body)
						,	can.view.frag(fragment.render(data.embedded.attr('collection.0')))
						)
						ok(Sigma.Model.HAL.Palabras.store[data.embedded.attr('collection.0').id],'Store OK')
						start();
					}
				)
			}
		)

		test(
			"Paginable collection"
		,	function()
			{
				stop();
				Sigma.Model.HAL.Palabras.fetch('/test/pageable_palabras?page=1&ipp=5&type=pageable','palabras')
				.then(
					function(data)
					{
						ok(data, "Resource OK");
						ok(data instanceof Sigma.Model.HAL.Palabras.Collection,'Resource Type OK')
						ok(data.embedded.attr('collection'),'Collection OK')
						ok(data.embedded.attr('collection.0'),'Resource from Collection OK')
						ok(data.embedded.attr('collection.0') instanceof Sigma.Model.HAL.Palabras,'Resource Type from Collection OK')
						can.append(
							can.$(document.body)
						,	can.view.frag(fragment.render(data.embedded.attr('collection.0')))
						)
						ok(Sigma.Model.HAL.Palabras.store[data.embedded.attr('collection.0').id],'Store OK')
						start();
						stop();
						data.links.attr('next').resolve()
						.then(
							function(next)
							{
								ok(next, "Resource OK");
								ok(next instanceof Sigma.Model.HAL.Palabras.Collection,'Next Resource Type OK')
								ok(next.embedded.attr('collection'),'Next Collection OK')
								ok(next.embedded.attr('collection.0'),'Resource from Next Collection OK')
								ok(next.embedded.attr('collection.0') instanceof Sigma.Model.HAL.Palabras,'Resource Type from Next Collection OK')
								can.append(
									can.$(document.body)
								,	can.view.frag(fragment.render(next.embedded.attr('collection.0')))
								)
								ok(Sigma.Model.HAL.Palabras.store[next.embedded.attr('collection.0').id],'Store OK')
								start();
								stop();
								next.links.attr('prev').resolve()
								.then(
									function(prev)
									{
										ok(prev, "Resource OK");
										ok(prev instanceof Sigma.Model.HAL.Palabras.Collection,'Prev Resource Type OK')
										ok(prev.embedded.attr('collection'),'Prev Collection OK')
										ok(prev.embedded.attr('collection.0'),'Resource from Prev Collection OK')
										ok(prev.embedded.attr('collection.0') instanceof Sigma.Model.HAL.Palabras,'Resource Type from Prev Collection OK')
										can.append(
											can.$(document.body)
										,	can.view.frag(fragment.render(prev.embedded.attr('collection.0')))
										)
										ok(Sigma.Model.HAL.Palabras.store[prev.embedded.attr('collection.0').id],'Store OK')
										start();
									}
								)
							}
						)
					}
				)
			}
		)
	}
)