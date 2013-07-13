var A
steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
,	'sigma/plugins'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Control.Assignations'
		,	{
				defaults:
				{
					view: false
				,	target: false
				,	view_modal:false
				,	modal: false
				,	acos: false
				,	assoc: false
				}
			}
		,	{
				_render_content:function(data)
				{
					console.log(data)
					this._super(data)
					$('.acc-wizard').accwizard(
						{
							nextText: "Próximo paso"
						,	backText: "Volver"
						,	onNext: function(parent,panel)
							{
								hash = "#" + panel.id;
							        can.$(".acc-wizard-sidebar",$(parent))
								.children("li")
								.children("a[href='" + hash + "']")
								.parents("li")
								.removeClass("acc-wizard-todo")
								.addClass("acc-wizard-completed");
							}
						,	onInit: function(el)
							{
								console.log(can.$(el).find('button'))
								can.$(el).find('button')
							}
						}	
					)
				}
			,	'button.btn click': function(el,ev)
				{
					var	self
					=	this

					console.log(can.$(el.parents('form')).data())

					can.$(el.parents('form')).data('next').resolve().then(
						function(data)
						{
							console.log(data.rel)
							console.log(data)
							can.$('div#table-'+data.rel).html(
								can.view(
									self.options[data.rel]
								,	data
								)
							)
							can.$('form#form-'+data.rel).find('h4').remove()
						}
					)

					/*can.trigger(
						'browse'
					,	{
							link: can.$(el.parents('form')).data('next')
						,	target
						}
					)*/
				}
			,	'input.select click': function(el, ev)
				{
					el.parents('form').data('next', el.data('next'))
				}
			}
		)
	}
)
