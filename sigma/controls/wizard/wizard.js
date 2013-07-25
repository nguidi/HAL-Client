steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
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
				,	current:			new can.Observe()
				,	form_data:			new can.Observe()
				,	content_control:	false
				,	hc_content:			false
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

					var self
					=	this
					
					this._render_wizard_steps()
					
					this._render_wizard_content()
					
					this._update_current(this.element.find('.step:first'))
				}

			,	_render_wizard_steps: function()
				{
					var	self
					=	this
					,	$wizard_step
					=	$('<div>')
							.addClass('wizard-steps')
							.appendTo(this.element)

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
						}
					)
				}

			,	_render_wizard_content: function()
				{
					var self
					=	this
					,	$wizard_content
					=	(this.options.view_content)
						?	can.append(
								this.element
							,	can.view(
									this.options.view_content
								,	this.options.data
								)
							).find('.wizard-content')
						:	$('div')
								.addClass('wizard-content')
								.appendTo(this.element)

					this.options.current.bind(
						'step'
					,	function(ev,new_val,old_val)
						{
							if	(!_.isUndefined(old_val))
								self.element.find('div.'+old_val.identity()).hide()
							
							self.element.find('div.'+new_val.identity()).show()
							
							self._render_wizard_actions()
						}
					)

					can.each(
						this.options.data.getSteps()
					,	function(step)
						{
							var	$step
							=	$('<div>')
									.addClass(step.identity())
									.appendTo($wizard_content)

							if	(self.options.hc_content)
								new	self.options.hc_content(
									$step
								,	{
										id:		'Wizard.Content.'+step.identity()
									,	slot:	_.extend(
													step
												,	{
														rel: step.index
													}
												)
									}
								)
							else
								new self.options.content_control(
									$step
								,	{
										slot : step
									,	container: self.options.container
									}
								)

							if	(step.isInitial())
								self.options.current.attr('step',step)
							else
								$step.hide()
						}
					)
				}

			,	_render_wizard_actions: function()
				{
					this.element.find('div.wizard-actions').remove()
					can.append(
						this.element
					,	can.view(
							this.options.view_actions
						,	this.options.current.step
						)
					)
				}

			,	check_step_requirements: function()
				{
					return	true
				}

			,	_update_current: function(step)
				{
					this.element
							.find('.current')
								.removeClass('current')

					this.element
							.find('span.badge')
								.removeClass('badge-warning')

					step
						.addClass('current')

					step
						.find('span.badge')
							.addClass('badge-warning')
				}

			,	' step_complete': function(element,ev)
				{
					var	step
					=	this.options.current.attr('step')
					,	form_data
					=	can.deparam(
							this.element
									.find('.'+step.identity())
										.find('form')
											.serialize()
						)

					this.element
							.find('.next')
								.removeClass('disabled')
				}
				

			,	'.next:not(".disabled") a:not(".final") click': function(current,ev)
				{
					if	(this.check_step_requirements())	{
						this.options
								.current
								.attr(
									'step'
								,	current.data('action').getFinalStep()
								)
						this._update_current(this.element.find('.step.current').next())	
					}
				}

			,	'.next:not(".disabled") a.final click':function(current,ev)
				{
					this._show_preview()
				}

			,	'.previous:not(".disabled") a  click': function(current,ev)
				{
					this.options
							.current
							.attr(
								'step'
							,	current.data('action').getFinalStep()
							)
					this._update_current(this.element.find('.step.current').prev())
				}
			}
		)
	}
)
