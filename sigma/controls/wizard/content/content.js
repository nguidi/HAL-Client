steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
,	'sigma/controls/form'
).then(
	function() {

		Sigma.HypermediaControl(
			'Sigma.Controls.Wizard.Content'
		,	{
				defaults:
				{
					form:			new can.Observe()
				,	form_control:	Sigma.Controls.Form
				,	form_views:
					{
						view_button:	'sigma/views/wizard/form/button.mustache'
					,	view_checkbox:	'sigma/views/wizard/form/checkbox.mustache'
					,	view_radio:		'sigma/views/wizard/form/radio.mustache'
					,	view_select:	'sigma/views/wizard/form/select.mustache'
					,	view_text:		'sigma/views/wizard/form/text.mustache'
					,	view_textarea:	'sigma/views/wizard/form/textarea.mustache'
					,	view_form:		'sigma/views/wizard/form/forms.mustache'
					}
				,	view_step_title:	'sigma/views/wizard/index.mustache'
				}
			}
		,	{
				_render_content: function(data)
				{						
					var	self
					=	this
					
					if	(data.hasInnerSteps())
					{
						self.options.$steps
						=	$('<div class="steps">')
								.appendTo(self.element)

						_.each(
							data.getInnerSteps().getSteps()
						,	function(step)
							{
								self._render_inner_step(step)
							}
						)

						_.each(
							data.getInnerSteps().getSteps()
						,	function(inner_step)
							{
								if	(!inner_step.hasRequirements()) {
									self.show_step(
											inner_step
										)
								}	else	{
									can.bind.call(
										self.element
									,	'custom_event_'+inner_step.identity()
									,	function(ev,el)
										{
											self.show_step(
												inner_step
											)
										}
									)

									self.bind_requirements(
											inner_step
										)
								}
							}
						)	
					}					
				}

			,	_render_inner_step: function(inner_step)
				{
					$('<div class="step">')
							.addClass(inner_step.identity())
							.attr('step',inner_step.attr('step'))
							.appendTo(this.options.$steps)
					
					var	$step
					=	this.element.find('div.'+inner_step.identity())

					can.append(
						$step
					,	can.view(
							this.options.view_step_title
						,	inner_step
						)
					)

					new	this.options.form_control(
						$step
					,	_.extend(
							{
								slot : inner_step.getForm()
							,	container: this.options.container
							}
						,	this.options.form_views
						)
					)
				}


			,	show_step: function(inner_step)
				{
					this.element
							.find('[step="'+inner_step.attr('step')+'"]')
							.hide()

					var	$step
					=	this.element
							.find('.'+inner_step.identity())
					
					$step
						.show()

					this.hide_next_steps($step)
				}

			,	hide_next_steps: function(step)
				{
					step.next().hide()

					var $next
					=	step.next()

					if	($next.hasClass('step'))
						this.hide_next_steps($next)
				}

			,	bind_requirements: function(inner_step)
				{
					var	self
					=	this

					_.each(
						inner_step.getRequirements().getFields()
					,	function(req)
						{

							var	form_field
							=	req.getFormField()
							,	$element
							=	_.isNull(req.attr('expected_value'))
								?	self.element.find('[name="'+form_field.attr('name')+'"]')
								:	self.element.find('[name="'+form_field.attr('name')+'"]').filter('[value="'+req.attr('expected_value')+'"]')
							,	element_type
							=	$element.is('input')
								?	$element.attr('type')
								:	$element.is('select')
									?	'select'
									:	$element.is('button')
										?	'button'
										:	'textarea'
							,	element_event
							=	_.contains(['checkbox','radio','select'],element_type)
								?	'change'
								:	(element_type == 'text')
									?	'keydown'
									:	(element_type == 'button')
										?	'click'
										:	'focusout'
							can.bind.call(
								$element
							,	element_event
							,	function(ev,el)
								{
									if	(element_event != 'keydown' || (element_event == 'keydown' && ev.keyCode == 13))
										self.check_step(ev.target,inner_step)
								}
							)
						}
					)
				}

			,	check_step: function(target,inner_step)
				{
					var	bool
					=	new Array()
					,	self
					=	this

					_.each(
						inner_step.getRequirements().getFields()
					,	function(req)
						{
							var	form_field
							=	req.getFormField()
							,	$form_field
							=	_.isNull(req.attr('expected_value'))
								?	self.element.find('[name="'+form_field.attr('name')+'"]:visible')
								:	self.element.find('[name="'+form_field.attr('name')+'"]').filter('[value="'+req.attr('expected_value')+'"]:visible')

							bool.push(
									!_.isEmpty($form_field.val())
								)
						}
					)

					if	(_.isEqual(_.first(_.uniq(bool)),true) && _.isEqual(_.uniq(bool).length,1))
						can.trigger(
							can.$(target)
						,	'custom_event_'+inner_step.identity()
						)
				}
			}
		)
	}
)