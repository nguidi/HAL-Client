steal(
	'can/util/fixture'
,	'sigma/util/hal_builder.js'
,	'sigma/models'
).then(
	function()
	{
		can.fixture(
			'GET /test/recursos/1'
		,	function()
			{
				return	new HAL_Resource(
								{
									id: 1
								,	name: 'Hola'
								}
							,	'/test/recursos/1'
							)
							.curies('show')
							.link('show:embed','/test/recursos/1/embed')
							.embed(
								'embed'
							,	new HAL_Resource(
										{
											id: 1
										,	name: 'p'
										}
									,	'/test/embeds/1'
									)
							)
							.toJSON()
			}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Recursos'
		,	{ }
		,	{
				unaFuncion: function()
				{
					return true
				}
			}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Embeds'
		,	{}
		,	{}
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
			"Resource model"
		,	function()
			{
				stop()
				Sigma.Model.HAL.Recursos.fetch('/test/recursos/1','recursos')
				.then(
					function(data)
					{
						ok(data,'Resource OK')
						ok(data instanceof Sigma.Model.HAL.Recursos,'Resource Type OK')
						ok(data.unaFuncion,'Custom Function OK')
						ok(data.links.get_link_by_rel('embed'),'Resource Link OK')
						ok(data.links.get_link_by_rel('embed') instanceof Sigma.Model.HAL.Show.Link,'Link Type OK')
						ok(data.links.get_link_by_rel('embed').get(),'Resource Embed OK')
						ok(data.links.get_link_by_rel('embed').get() instanceof Sigma.Model.HAL.Embeds,'Embed Type OK')
						can.append(
							can.$(document.body)
						,	can.view.frag(fragment.render(data))
						)
						ok(data.constructor.store[data.id],'Store OK')
						start()
					}
				)	
			}
		)
	}
)
