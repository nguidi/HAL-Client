steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
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
					can.append(
						can.$('#list_table')
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
