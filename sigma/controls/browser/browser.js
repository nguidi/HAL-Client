steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Control.Browser'
		,	{
				defaults:
				{
					view: false
				}
			}
		,	{
				_render_content: function(data)
				{
					this._super(data)
					
					var	$element
					=	this.element

					can.each(
						data.attr('linksAsList')
					,	function(link)
						{
							$element
								.find('tr.'+link.class()+' span.label')
								.addClass(
									_.isEqual(link.method(),'GET')
									?	'label-success'
									:	_.isEqual(link.method(),'POST')
										?	'label-info'
										:	_.isEqual(link.method(),'PUT')
											?	'label-warning'
											:	'label-important'
								)
						}
					)
				}
			,	'.browseable click': function(el,ev)
				{
					ev.preventDefault()
					el.data('link').resolve()
				}
			,	'button.btn click':function(el,ev)
				{
					var	$input
					=	this.element.find('input[name="custom_url"]')
					,	href
					=	'http://trabajando:3003/api/data'+$input.val()

					this.element.trigger(
							'browse'
						,	_.extend(
								{
									target:	this.options.target
								}
							,	_.isEqual(href,'http://trabajando:3003/api/data/')
								?	{
										link:	this.options.data.attr('self')
									}
								:	{
										href:	href
									}
							)
							
						)
				}
			}
		)
	}
)