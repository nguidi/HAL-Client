steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
,	'sigma/controls/form/preloader_select.js'
).then(
	function(){
			Sigma.HypermediaControl(
			'Sigma.Controls.Form'
		,	{
				defaults:
				{
					view_select:	'sigma/views/form/select.mustache'
				,	view_textarea:	'sigma/views/form/textarea.mustache'
				,	view_file:		'sigma/views/form/file.mustache'
				,	view_radio:		'sigma/views/form/radio.mustache'
				,	view_checkbox:	'sigma/views/form/checkbox.mustache'
				,	view_text:		'sigma/views/form/text.mustache'
				,	view_button:	'sigma/views/form/button.mustache'
				}
			}
		,	{
				_render_content: function(data)
				{	
					var	self
					=	this

					if (this.options.view_form)
						can.append(
							this.element
						,	can.view(
								this.options.view_form
							,	data
							)
						)
					else
						$('<form>')
							.addClass(data.identity())
							.appendTo(this.element)

					_.each(
						data.getFields()
					,	function(field)
						{
							can.append(
								self.element.find('form')
							,	can.view(
									self.options['view_'+(_.isEqual(field.getFieldType(),'input') ? field.attr('type') : field.getFieldType())]
								,	field
								)
							)
							self.element
									.find(
										field.getFieldType()+':last'
									).addClass(
										field.identity()
									)
							// if	(field.attr('depends'))
							// {
							// 	var $element
							// 	=	self.element.parents('.steps').find('[name="'+field.attr('depends')+'"]:visible')
							// 	can.bind.call(
							// 		$element
							// 	,	'change'
							// 	,	function(el,ev)
							// 		{
							// 			field.setOptionsbySelected(
							// 				$element.val()
							// 			)
										
							// 			var $field
							// 			=	self.element.find('[name="'+field.attr('name')+'"]')

							// 			$field
							// 				.find('options')
							// 				.remove()

							// 			can.each(
							// 				field.getOptions()
							// 			,	function(option)
							// 				{
							// 					$('<option value="'+option.label+'">'+option.label+'</option>')
							// 						.appendTo($field)
							// 				}
							// 			)
							// 		}
							// 	)
							// }
						}
					)

					// can.trigger(
					// 	this.element
					// ,	'form_done'
					// )
				}
			}
		)
	}
)