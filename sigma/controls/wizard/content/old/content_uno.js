steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	'sigma/stock/controls/wizard/content/content.js'
).then(
	function() {

		Sigma.Controls.Wizard.Content(
			'Sigma.Controls.Wizard.Content.Uno'
		,	{
				defaults:
				{
					view_init:		false
				,	view_index:		false
				,	target:			false
				}
			}
		,	{
				'_render_inner_form': function()
				{					
					this._super()

					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step1'
							,	index:	'1.1'
							,	label:	'Seleccione un Tipo de Proceso'
							}
						,	'clase_procesos'
						)

					can.trigger(
						this.element.find('select[name="clase_procesos"]')
					,	'change'
					)

				}

			,	'select[name="clase_procesos"] change': function()
				{
					this.options.$form
						.find('label[for="nuevo_proceso"]')
						.parents('.control-group')
						.find('input')
						.attr('name','step2')
					
					this.options.$form
						.find('label[for="editar_proceso"]')
						.parents('.control-group')
						.find('input')
						.attr('name','step2')

					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step2'
							,	index:	'1.2'
							,	label:	'Seleccione un Metodo de Creación'
							}
						,	['nuevo_proceso','editar_proceso']
						)					
				}

			,	'input[value="nuevo_proceso"] change': function()
				{
					this.options.$form
						.find('label[for="desde_uno"]')
						.parents('.control-group')
						.find('input')
						.attr('name','step3')

					this.options.$form
						.find('label[for="desde_cero"]')
						.parents('.control-group')
						.find('input')
						.attr('name','step3')

					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step3'
							,	index:	'1.3'
							,	label:	'Metodo de creación de un Nuevo Proceso'
							}
						,	['desde_uno','desde_cero']
						)
				}

			,	'input[value="editar_proceso"] change': function()
				{
					this.show_form(
							'left-content'
						,	'left-content'
						,	{
								id:		'step3'
							,	index:	'1.3'
							,	label:	'Seleccione el Proceso a Editar'
							}
						,	['edicion_proceso_actividad','edicion_proceso_programa','edicion_proceso_plan']
						)
					
					can.trigger(
						this.element.find('select[name="edicion_proceso_actividad"]')
					,	'change'
					)
				}

			,	'select[name="edicion_proceso_actividad"], select[name="edicion_proceso_programa"], select[name="edicion_proceso_plan"] change': function()
				{
					this.show_form(
							'left-content'
						,	'right-content'
						,	{
								id:		'step4'
							,	index:	'1.4'
							,	label:	'Edite el Nombre del Proceso'
							}
						,	'nombre_proceso'
						)
				}

			,	'input[value="desde_uno"] change': function()
				{
					this.show_form(
							'left-content'
						,	'right-content'
						,	{
								id:		'step4'
							,	index:	'1.4'
							,	label:	'Seleccione el Proceso a Editar'
							}
						,	['desde_proceso_actividad','desde_proceso_programa','desde_proceso_plan']
						)
					
					can.trigger(
						this.element.find('select[name="desde_proceso_actividad"]')
					,	'change'
					)
				}

			,	'select[name="desde_proceso_actividad"], select[name="desde_proceso_programa"], select[name="desde_proceso_plan"] change': function()
				{
					this.show_form(
							'right-content'
						,	'right-content'
						,	{
								id:		'step5'
							,	index:	'1.5'
							,	label:	'Ingrese el Detalle del Proceso'
							}
						,	'detalle_proceso'
						)
				}

			,	'input[value="desde_cero"] change': function()
				{
					this.show_form(
							'left-content'
						,	'right-content'
						,	{
								id:		'step4'
							,	index:	'1.4'
							,	label:	'Ingrese el Nombre Proceso'
							}
						,	'nombre_proceso'
						)
				}

			,	'input[name="nombre_proceso"] keydown': function(el,ev)
				{
					if	(
							ev.keyCode == 13 
						&&	!_.isEmpty(can.$('input[name="nombre_proceso"]').val())
						)
					{
						this.show_form(
							'right-content'
						,	'right-content'
						,	{
								id:		'step5'
							,	index:	'1.5'
							,	label:	'Ingrese el Detalle del Proceso'
							}
						,	'detalle_proceso'
						)
					}

				}

			,	'textarea[name="detalle_proceso"] focusout': function(el,ev)
				{
					if	(
							!_.isEmpty(can.$('textarea[name="detalle_proceso"]').val())
						)
					{
						this.show_form(
							'right-content'
						,	'right-content'
						,	{
								id:		'step6'
							,	index:	'1.6'
							,	label:	'Seleccione a que tipo de proceso pertenece'
							}
						,	['pertenece_programa','pertenece_plan']
						)
					}

				}
			}
		)
	}
)
