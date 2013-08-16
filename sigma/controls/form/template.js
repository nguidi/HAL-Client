Sigma.HypermediaControl(
	'Sigma.Controls.Template'
,	{
		defaults:{
			view_form: false
		,	view_select: '//stock/controls/former/views/inputSelect.mustache'
		,	view_textarea: '//stock/controls/former/views/inputTextarea.mustache'
		,	view_file: '//stock/controls/former/views/inputUpload.mustache'
		,	view_radio: '//stock/controls/former/views/inputRadio.mustache'
		,	view_checkbox: '//stock/controls/former/views/inputCheckbox.mustache'
		}
	}
,	{
		_render_content: function(data)
		{	
			can.append(
				this.element
			,	can.$('<div class="form-wrapper">')
					.append(can.view(this.options.view_form,data))
			)

			this.typefy()
		}

	,	typefy:function()
		{
			var inputs
			=	this.element.find("input")
			,	self
			=	this

			$.each(
				inputs
			,	function(index,input)
				{
					var type
					=	input.getAttribute("data-type")
					,	new_input
					=	(type=='text')
							?input
							:self.transformInput(type,input)

					$(this).parent('span').html(new_input)
				}
			)
		}

	,	transformInput:function(type,input)
		{
			return can.view(this.options['view_'+type],this.getDataInput(input))
		}

	,	getDataInput: function(input)
		{
			return 	{
						name: 	input.getAttribute("name")
					,	id: 	input.getAttribute("id")
									?input.getAttribute("id")
									:input.getAttribute("name")
					,	default_option: input.getAttribute("default")
											?input.getAttribute("default")
											:'Seleccione una opcion'
					,	rows: input.getAttribute("rows")
								?input.getAttribute("rows")
								:2
					,	cols: input.getAttribute("cols")
								?input.getAttribute("cols")
								:40
					}
		}

	,	update_content: function(data)
		{
			ev.preventDefault()
				this.element.trigger(
					'browse'
				,	{
						links:this.options.data
					,	rel:el.data('relation')
					,	name:el.data('name')
					,	target:this.options.target_content
					}
				)
		}
	}
)