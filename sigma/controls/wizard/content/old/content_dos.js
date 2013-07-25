steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	'sigma/stock/controls/wizard/content/content.js'
).then(
	function() {

		Sigma.Controls.Wizard.Content(
			'Sigma.Controls.Wizard.Content.Dos'
		,	{
				defaults:
				{
					view_init:		false
				,	view_index:		false
				,	target:			false
				,	campos_extras:	new can.Observe.List()
				}
			}
		,	{
				_render_inner_form: function()
				{					
					this._super()

					this.element
							.find('.right-content')
							.toggleClass('right-content table-content')

					this.options.$form
						.find('label[for="campo_existente"]')
						.parents('.control-group')
						.find('input')
						.attr('name','step1')
					
					this.options.$form
						.find('label[for="campo_desde_cero"]')
						.parents('.control-group')
						.find('input')
						.attr('name','step1')

					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step1'
							,	index:	'2.1'
							,	label:	'Seleccione un Metodo para agregar un Campo Extra'
							}
						,	['campo_existente','campo_desde_cero']
						)

					can.append(
						this.element
							.find('.table-content')
					,	can.view(
							this.options.view_list
						,	this.options.campos_extras
						)
					)
				}

			,	'input[value="campo_existente"] change': function()
				{
					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step2'
							,	index:	'2.2'
							,	label:	'Seleccione el campo extra a agregar'
							}
						,	'select_campo_extra'
						)

					can.trigger(
						this.element.find('select[name="select_campo_extra"]')
					,	'change'
					)
				}

			,	'select[name="select_campo_extra"] change': function()
				{
					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step3'
							,	index:	'2.3'
							,	label:	'Verifique el campo seleccionado y presione agregar'
							}
						,	['agregar_campo']
						)
				}

			,	'input[value="campo_desde_cero"] change': function()
				{
					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step2'
							,	index:	'2.2'
							,	label:	'Complete los datos para el nuevo campo extra'
							}
						,	['nombre_campo','tipo_campo','entidad_campo','default_campo','grupo_campo']
						)

					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step3'
							,	index:	'2.3'
							,	label:	'Verifique los datos del nuevo campo y presione agregar'
							}
						,	['agregar_campo']
						)
				}

			,	'button[name="agregar_campo"] click': function()
				{

				}
			}
		)
	}
)
