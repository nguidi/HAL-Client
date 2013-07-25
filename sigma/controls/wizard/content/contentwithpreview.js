steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
,	'sigma/controls/form'
).then(
	function() {

		Sigma.Controls.Wizard.Content(
			'Sigma.Controls.Wizard.ContentWithPreview'
		,	{
				defaults:
				{
					view_preview:	'sigma/views/wizard/preview/step_preview.mustache'
				,	saved_form:		new can.Observe.List()
				}
			}
		,	{
				_render_content:function(data)
				{
					this._super(data)
					
					var $steps
					=	this.element
								.find('.steps')
					$steps
						.parent()
						.addClass('row')
					
					$steps
						.addClass('span6')

					var $preview
					=	$('<div class="preview span6">')
					
					$preview
						.appendTo(this.element)

					this._render_preview($preview)
				}

			,	_render_preview: function(preview)
				{
					var	self
					=	this

					this.options.preview_data
					=	this.options.data.getPreview()
					
					can.append(
						preview
					,	can.view(
							this.options.view_preview
						,	this.options.preview_data
						)
					)
				}

			,	'button click': function(el,ev)
				{
					console.log(arguments)
					var	self
					=	this
					,	$form
					=	this.element
								.find('form:visible')
					,	form_data
					=	can.getFormData($form)
					,	form_field_element

					if	(_.isUndefined(this.options.preview_data.attr('headers')))
						this.options.preview_data.attr('headers',[])
					if	(_.isUndefined(this.options.preview_data.attr('body')))
						this.options.preview_data.attr('body',[])
					
					var	$tr
					=	$('<tr></tr>')

					_.each(
						form_data
					,	function(form_field)
						{
							_.each(
								self.element.find('[name='+form_field.key+']')
							,	function(ele)
								{
									if	($(ele).val() == form_field.value)
										form_field_element
										=	$(ele).parents('.control-group')
								}
							)

							self.resolve_header(form_field_element,form_field)

							self.resolve_body($tr,form_field)
						}
					)

					$tr
						.appendTo(
							this.element.find('tbody')
						)

					this.options.saved_form.push(form_data)

					can.cleanForm($form)
				}

			,	resolve_header: function(form_field_element,form_field)
				{
					if	(form_field_element)	{
						var	form_field_label
						=	form_field_element.find('label[for='+form_field.key+']').text().trim()
						
						if	(
								!_.contains(
									this.options.preview_data.attr('headers')
								,	form_field_label
								)
							)
						{
							this.add_header({id: form_field.key, title: form_field_label})
							this.options.preview_data.attr('headers').push(form_field_label)
						}
					}	else
						this.add_header({id: form_field.key, title: can.capitalize(form_field_key)})
				}

			,	resolve_body: function(tr,form_field)
				{
					var	td_element
					=	$('<td id="'+form_field.key+'">'+form_field.value+'</td>')

					td_element
						.appendTo(
							tr
						)
				}

			,	add_header: function(header)
				{
					var header_element
					=	$('<th id="'+header.id+'">'+header.title+'</th>')
					
					header_element
						.appendTo(
							this.element.find('thead tr')
						)
				}
			}
		)
	}
)