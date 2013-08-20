steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	'sigma/controls/form'
).then(
	function() {

		Sigma.HypermediaControl(
			'Sigma.Controls.Wizard_Content'
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
					,	view_typeahead: 'sigma/views/wizard/form/autocomplete.mustache'
					,	view_typeahead_li: 'sigma/views/typeahead/ajax_li.mustache'
					}
				,	view_step_title:	'sigma/views/wizard/index.mustache'
				,	prev_steps_data:	new can.Observe() 
				}
			}
		,	{
				_render_content: function(data)
				{						
					var	self
					=	this

					this.options.reqs
					=	this.get_step_requirements(data)

					
					if	(data.hasInnerSteps())
					{
						self.options.$pending_steps
						=	$('<div>')
								.addClass('pending')
								.appendTo(self.element)
								.hide()
						
						self.options.$steps
						=	$('<div>')		
								.addClass('steps')
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
									,	'custom_event_show_'+inner_step.identity()
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

								can.bind.call(
									self.element
								,	'custom_event_delete_'+inner_step.identity()
								,	function(ev,el)
									{
										self.delete_step(
											inner_step
										)
									}
								)

								self.bind_fields(
										inner_step
									)
							}
						)	
					}

					if	(this.options.data.isInitial())
						can.trigger(
							this.element
						,	'initial_step'
						)

					if	(this.options.data.isFinal())
						can.trigger(
							this.element
						,	'final_step'
						)

					can.trigger(
							this.element
						,	'step_rendered'
						)
				}

			,	_render_inner_step: function(inner_step)
				{
					var	$step
					=	can.$('<div class="step">')
					
					$step
						.addClass(
							inner_step.identity()
						)
					
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

					$step
						.appendTo(
							this.options.$pending_steps
						)
				}

			,	get_step: function(step)
				{
					return	((this.options.$steps.find('div.step:visible').length)+1)+' - '
				}

			,	get_step_requirements: function(step)
				{
					var reqs
					=	new Array()

					_.each(
						_.map(
							_.filter(
								step.getInnerSteps().getSteps()
							,	function(inner_step)
								{
									return	inner_step.hasRequirements()
								}
							)
						,	function(inner_step)
							{
								return	inner_step.getRequirements().getFields()
							}
						)
					,	function(req_constr)
						{
							reqs.push.apply(reqs,req_constr)
						}
					)
					
					return	reqs
				}


			,	show_step: function(inner_step)
				{					
					if	(!this.options.$steps.find('.'+inner_step.identity()).length)	{
						console.log('SHOW - ',inner_step.identity())
						var	$step
						=	this.options.$pending_steps
									.find('.'+inner_step.identity())

						$step
							.find('.step strong')
								.remove()

						$step
							.find('.step')
								.prepend('<strong>'+this.get_step(inner_step)+'</strong>')

						$step
							.appendTo(
								this.options.$steps
							)
					}
				}

			,	delete_step: function(inner_step)
				{
					if	(this.options.$steps.find('.'+inner_step.identity()))
					{
						console.log("DELETE - ",inner_step.identity())
						var $step
						=	this.options.$steps
									.find('.'+inner_step.identity())

						this.remove_next_steps($step.next())
					}
				}

			,	remove_next_steps: function(step)
				{
					var $next
					=	step.next()
					
					if	($next.hasClass('step'))
						this.remove_next_steps($next)

					can.cleanForm(
						step
							.find('form')
					)

					step
						.appendTo(
							this.options.$pending_steps
						)
				}

			,	bind_fields: function(inner_step)
				{
					var	self
					=	this

					_.each(
						inner_step.getForm().getFields()
					,	function(form_field)
						{
							var	element
							=	self.get_field_element_data(inner_step,form_field)

							can.bind.call(
								element.el
							,	element.ev
							,	function(ev,el)
								{
									if	(element.ev != 'keydown' || (element.ev == 'keydown' && ev.keyCode == 13))
										can.trigger(
											self.element
										,	'custom_event_delete_'+inner_step.identity()
										)
								}
							)
						}
					)
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
							,	element
							=	self.get_req_element_data(form_field)
							if	(_.isEqual(element.type,'radio'))
								element.el
								=	element.el.filter('[value="'+req.attr('expected_value')+'"]')

							can.bind.call(
								element.el
							,	element.ev
							,	function(ev,el)
								{
									if	(
											element.ev != 'keydown' 
										||	(element.ev == 'keydown' && ev.keyCode == 13)
										||	(element.ev == 'keydown' && ev.keyCode == undefined)
										)
										self.check_step_requirements(ev.target,inner_step)
								}
							)
						}
					)

					if	(inner_step.isFinal())
						_.each(
							inner_step.getForm().getFields()
						,	function(form_field)
							{
								var	element
								=	self.get_field_element_data(inner_step,form_field)

								can.bind.call(
									element.el
								,	element.ev
								,	function(ev,el)
									{
										if	(
												element.ev != 'keydown' 
											||	(element.ev == 'keydown' && ev.keyCode == 13)
											||	(element.ev == 'keydown' && ev.keyCode == undefined)
											)
											self.check_final_step(inner_step)
									}
								)
							}
						)
				}

			,	get_req_element_data: function(form_field)
				{
					var	$element
					=	this.element.find('.'+form_field.identity())

					return	this.get_element_data($element)
				}

			,	get_field_element_data: function(inner_step,form_field)
				{
					var	$element
					=	this.element.find('.'+inner_step.identity()+' .'+form_field.identity())

					return	this.get_element_data($element)
				}

			,	get_element_data: function(element)
				{
					var	$element
					=	element

					var	element_type
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

					return	{
								el:		$element
							,	type:	element_type
							,	ev:		element_event
							}
				}

			,	validate_field: function(form_field,req)
				{
					var	$form_field
					=	this.element.find('.'+form_field.identity()+':visible')

					if	($form_field.is('[type="radio"]'))
						$form_field
						=	this.options.$steps.find('.'+form_field.identity()+':visible:checked')

					return	_.isUndefined(req) || (_.isEmpty(req.attr('expected_value')) && !_.isNumber(req.attr('expected_value')))
							?	!_.isEmpty($form_field.val())
							:	$form_field.val() && _.isEqual($form_field.val().toLowerCase(),(req.attr('expected_value')+"").toLowerCase())
				}

			,	check_step_requirements: function(target,inner_step)
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

							bool.push(
									self.validate_field(form_field,req)
								)
						}
					)

					if	(_.isEqual(_.first(_.uniq(bool)),true) && _.isEqual(_.uniq(bool).length,1))
						can.trigger(
							this.element
						,	'custom_event_show_'+inner_step.identity()
						)						
				}

			,	check_final_step: function(inner_step)
				{
					var	bool
					=	new Array()
					,	self
					=	this

					_.each(
						inner_step.getForm().getFields()
					,	function(form_field)
						{
							bool.push(
									self.validate_field(form_field)
								)
						}
					)

					if	(_.isEqual(_.first(_.uniq(bool)),true) && _.isEqual(_.uniq(bool).length,1))
						can.trigger(
							self.element
						,	'step_complete'
						,	_.extend(
								{
									id:	self.options.data.attr('id')
								}
							,	can.getFormData(self.options.$steps.find('form:visible'))
							)
						)
				}
			}
		)
	}
)