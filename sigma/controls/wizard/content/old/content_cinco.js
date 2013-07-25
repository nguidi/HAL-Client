steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	'sigma/stock/controls/wizard/content/content.js'
).then(
	function() {

		Sigma.Controls.Wizard.Content(
			'Sigma.Controls.Wizard.Content.Cinco'
		,	{
				defaults:
				{
					view_init:		false
				,	view_index:		false
				,	target:			false
				,	transiciones:	new can.Observe.List()
				}
			}
		,	{
				_render_inner_form: function()
				{					
					this._super()

					this.element
							.find('.right-content')
							.toggleClass('right-content table-content')

					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step1'
							,	index:	'5.1'
							,	label:	'Seleccione un Estado Origen'
							}
						,	'estado_origen'
						)

					can.append(
						this.element
							.find('.table-content')
					,	can.view(
							this.options.view_list
						,	this.options.transiciones
						)
					)

					can.trigger(
						this.element.find('select[name="estado_origen"]')
					,	'change'
					)
				}

			,	'select[name="estado_origen"] change': function()
				{
					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step2'
							,	index:	'5.2'
							,	label:	'Seleccione un Estado Final'
							}
						,	'estado_destino'
						)

					can.trigger(
						this.element.find('select[name="estado_destino"]')
					,	'change'
					)
				}

			,	'select[name="estado_destino"] change': function()
				{
					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step3'
							,	index:	'5.3'
							,	label:	'Seleccione un Evento'
							}
						,	'evento_transicion'
						)

					can.trigger(
						this.element.find('select[name="evento_transicion"]')
					,	'change'
					)
				}

			,	'select[name="evento_transicion"] change': function()
				{
					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step4'
							,	index:	'5.4'
							,	label:	'Complete el tiempo estimado para que el evento ocurra'
							}
						,	'tiempo_estimado'
						)

				}

			,	'input[name="tiempo_estimado"] keydown': function(el,ev)
				{
					if	(
							ev.keyCode == 13 
						&&	!_.isEmpty(can.$('input[name="tiempo_estimado"]').val())
						)
					{
						this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step5'
							,	index:	'5.5'
							,	label:	'Determine si la transicion ocurre por defecto'
							}
						,	'ocurre_defecto'
						)

						can.trigger(
							this.element.find('select[name="ocurre_defecto"]')
						,	'change'
						)
					}
				}

			,	'select[name="ocurre_defecto"] change': function(el,ev)
				{
					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step6'
							,	index:	'5.6'
							,	label:	'Agregue los campos requeridos'
							}
						,	['campo_extra','agregar_campo_extra']
						)
				}

			,	'button[name="agregar_transicion"] click': function()
				{

				}
			}
		)
	}
)
