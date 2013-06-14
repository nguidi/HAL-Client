steal(
	'sigma/stock/controls/lib'
,	'sigma/hal/collections.js'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.List'
		,	{
				defaults:{
					view_list: false
				,	view_template_list: false
				}
			}
		,	{
				_render_content: function(data)
				{
					data.attr(
						'headers_list'
					,	[
							{
								title:"Planes"
							,	span: 3
							}
						,	{
								title:"Programas asociados"
							,	span: 4
							}
						,	{
								title:"Paises"
							,	span: 1
							}
						,	{
								title:"Objetivos"
							,	span: 4
							}
						]
					)
					can.append(
						this.element
					,	can.$('<div class="list-wrapper">')
							.append(
								can.view(
									this.options.view_list
								,	data
								)
							)
					)

					//console.log(data.planes())

					can.append(
						can.$('#planes_list_table')
					,	can.view(
							this.options.view_template_list
						,	data
						)
					)
				}

			,	'.browseable click': function(el,ev)
				{
					console.log(el.data('link').links, ev)
					this.element.trigger(
						'browse'
					,	{
							links: el.data('link').href
						,	rel: el.data('link').rel
						,	name: el.data('link').name
						,	target: this.options.target
						}
					)
				}

			,	' rapid_search': function(el,ev,data)
				{
				if 	(data != undefined)
					{
						can.each(this.element.find('tbody').find('tr')
						,	function(item)
							{
								if(_.isObject(item) && can.$(item).selector != 'tbody')
								{
									aux = false
									can.each(can.$(item).find('td.buscable')
									,	function(td)
										{
											if(_.isObject(can.$(td)[0]) && can.$(td).length == 1)
											{
											var 	b = can.$(td)[0].textContent
											if 	(_.isString(b) && can.underscore(b).search(can.underscore(data))>-1)
												aux = true
											}
										}
									)
									if(aux)
										can.$(item).removeClass('hidden')
									else
										can.addClass(can.$(item),'hidden')
								}
							}
						)
					}
				}
			}
		)
	}
)
