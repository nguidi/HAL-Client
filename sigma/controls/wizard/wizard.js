steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	'sigma/controls/form'
,	'sigma/plugins'
).then(
	function() {

		Sigma.HypermediaControl(
			'Sigma.Controls.Wizard'
		,	{
				defaults:
				{
					view_init:			false
				,	view_steps:			false
				,	view_content:		false
				,	view_actions:		false
				,	current_step:		new can.Observe()
				,	form_data:			new can.Observe()
				,	content_control:	false
				,	hc_content:			false
				,	hc_id:				'Wizard.Inner_Content'
				}
			}
		,	{
				_render_content: function(data)
				{	
					can.append(
						this.element
					,	can.view(
							this.options.view_init
						,	data
						)
					)    

					this.$next
					=	this.element.find('.next').parent('li')

					this.$prev
					=	this.element.find('.prev').parent('li')

					this._render_wizard_steps()
					
					this._render_wizard_content()
					
					this.element
							.find('.acc-wizard')
								.accwizard(
									{
										addButtons:	false
									}
								)

					this.update_current(this.element.find('.acc-wizard-todo:first'))

				}

			,	_render_wizard_steps: function()
				{
					var	self
					=	this
					,	$wizard_step
					=	this.element.find('.acc-wizard-sidebar')

					can.each(
						this.options.data.getSteps()
					,	function(step)
						{
							can.append(
								$wizard_step
							,	can.view(
									self.options.view_steps
								,	step
								)
							)

							$wizard_step
								.find('li:last')
									.attr('data-owner',step.identity())
									.data(
										'step'
									,	_.extend(
											step
										,	{
												rel: ""+step.index
											}
										)
									)
						}
					)
				}

			,	_render_wizard_content: function()
				{
					var	self
					=	this
					,	$wizard_content
					=	this.element.find('.acc-wizard-content')

					can.append(
						$wizard_content
					,	can.view(
							this.options.view_content
						,	this.options.current_step
						)
					)

					new	this.options.hc_content(
						$wizard_content
							.find('.acc-wizard-step-content')
								.find('.accordion-inner')
					,	{
							id:		this.options.hc_id
						}
					)
				}

			,	update_previus: function(step)
				{
					step
						.removeClass('acc-wizard-todo')
						.removeClass('acc-wizard-active')
						.addClass('acc-wizard-completed')
						.addClass('text-success')
				}

			,	update_current: function(step)
				{
					step
						.removeClass('acc-wizard-completed')
						.addClass('acc-wizard-todo')
						.addClass('acc-wizard-active')

					this.options.current_step.attr('title',step.data('step').attr('title'))

					can.trigger(
						this.element
					,	'browse'
					,	{
							target:	this.options.hc_id
						,	data:	step.data('step')
						,	options:
							{
								prev_form_data:	this.options.form_data
							}
						}
					)
				}

			,	update_next: function(step)
				{					
					step
						.removeClass('acc-wizard-active')
						.addClass('acc-wizard-todo')
				}

			,	'.acc-wizard-todo li, .acc-wizard-todo a click': function(el,ev)
				{
					ev.preventDefault()
				}				

			,	'li:not(".disabled") a.next click': function(current,ev)
				{
					var	current
					=	this.element.find('.acc-wizard-active')

					this.update_previus(current)

					this.$prev
							.removeClass('disabled')

					this.$next
							.addClass('disabled')
					
					this.update_current(current.next())
				}

			,	'li:not(".disabled") a.prev click': function(current,ev)
				{
					var	current
					=	this.element.find('.acc-wizard-active')

					this.update_next(current)

					this.update_current(current.prev())

					this.$next
							.removeClass('disabled')
				}

			,	' step_incomlete': function(el,ev)
				{
					this.$next
							.addClass('disabled')
				}

			,	' step_complete': function(el,ev,step)
				{
					this.options
							.form_data
								.attr(
									step.id
								,	step.query
								)

					this.$next
							.removeClass('disabled')
				}

			,	' final_step': function(el,ev)
				{
					this.$next
							.text('Finalizar')
				}

			,	' initial_step': function(el,ev)
				{
					this.$prev
							.addClass('disabled')
				}

			,	' step_rendered': function(el,ev)
				{
					this.$next
							.addClass('disabled')
				}
			}
		)
	}
)
