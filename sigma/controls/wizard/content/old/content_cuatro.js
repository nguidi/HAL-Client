steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	'sigma/stock/controls/wizard/content/content.js'
).then(
	function() {

		Sigma.Controls.Wizard.Content(
			'Sigma.Controls.Wizard.Content.Cuatro'
		,	{
				defaults:
				{
					view_init:		false
				,	view_index:		false
				,	target:			false
				,	conceptos:	new can.Observe.List()
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
						.find('label[for="concepto_existente"]')
						.parents('.control-group')
						.find('input')
						.attr('name','step1')
					
					this.options.$form
						.find('label[for="concepto_desde_cero"]')
						.parents('.control-group')
						.find('input')
						.attr('name','step1')

					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step1'
							,	index:	'4.1'
							,	label:	'Seleccione un Metodo para gregar un Concepto'
							}
						,	['concepto_existente','concepto_desde_cero']
						)

					can.append(
						this.element
							.find('.table-content')
					,	can.view(
							this.options.view_list
						,	this.options.conceptos
						)
					)
				}

			,	'input[value="concepto_existente"] change': function()
				{
					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step2'
							,	index:	'4.2'
							,	label:	'Seleccione el Concepto a agregar'
							}
						,	'select_concepto'
						)

					can.trigger(
						this.element.find('select[name="select_concepto"]')
					,	'change'
					)
				}

			,	'select[name="select_concepto"] change': function()
				{
					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step3'
							,	index:	'4.3'
							,	label:	'Verifique el Concepto seleccionado y presione agregar'
							}
						,	['agregar_concepto']
						)
				}

			,	'input[value="concepto_desde_cero"] change': function()
				{
					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step2'
							,	index:	'4.2'
							,	label:	'Complete los datos para el nuevo Concepto'
							}
						,	['codigo_concepto','cuenta_concepto']
						)

					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step3'
							,	index:	'4.3'
							,	label:	'Verifique los datos del nuevo Concepto y presione agregar'
							}
						,	['agregar_concepto']
						)
				}

			,	'button[name="agregar_concepto"] click': function()
				{

				}
			}
		)
	}
)
