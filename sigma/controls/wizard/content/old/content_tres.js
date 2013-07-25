steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	'sigma/stock/controls/wizard/content/content.js'
).then(
	function() {

		Sigma.Controls.Wizard.Content(
			'Sigma.Controls.Wizard.Content.Tres'
		,	{
				defaults:
				{
					view_init:		false
				,	view_index:		false
				,	target:			false
				,	indicadores:	new can.Observe.List()
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
						.find('label[for="indicador_existente"]')
						.parents('.control-group')
						.find('input')
						.attr('name','step1')
					
					this.options.$form
						.find('label[for="indicador_desde_cero"]')
						.parents('.control-group')
						.find('input')
						.attr('name','step1')

					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step1'
							,	index:	'3.1'
							,	label:	'Seleccione un Metodo para agregar un Indicador'
							}
						,	['indicador_existente','indicador_desde_cero']
						)

					can.append(
						this.element
							.find('.table-content')
					,	can.view(
							this.options.view_list
						,	this.options.indicadores
						)
					)
				}

			,	'input[value="indicador_existente"] change': function()
				{
					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step2'
							,	index:	'3.2'
							,	label:	'Seleccione el Indicador a agregar'
							}
						,	'select_indicador'
						)

					can.trigger(
						this.element.find('select[name="select_indicador"]')
					,	'change'
					)
				}

			,	'select[name="select_indicador"] change': function()
				{
					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step3'
							,	index:	'3.3'
							,	label:	'Verifique el Indicador seleccionado y presione agregar'
							}
						,	['agregar_indicador']
						)
				}

			,	'input[value="indicador_desde_cero"] change': function()
				{
					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step2'
							,	index:	'3.2'
							,	label:	'Complete los datos para el nuevo Indicador'
							}
						,	['nombre_indicador','tipo_indicador','default_indicador','grupo_indicador']
						)

					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step3'
							,	index:	'3.3'
							,	label:	'Verifique los datos del nuevo Indicador y presione agregar'
							}
						,	['agregar_indicador']
						)
				}

			,	'button[name="agregar_indicador"] click': function()
				{

				}
			}
		)
	}
)
