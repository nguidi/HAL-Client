steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
,	'sigma/plugins'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Control.Groups'
		,	{
				defaults:
				{
					view: false
				,	target: false
				,	view_modal:false
				,	modal: false
				}
			}
		,	{
				_render_content: function(data)
				{
					this._super(data)
					
					this.set_name_editable()

					this.set_permissions_editable()
					
					this.set_acos_editable()
				}
			,	set_name_editable: function()
				{
					can.$('.name-editable')
						.editable(
							{
								emptytext:	'Asignar Nombre'
							,	title:		'Modificar Nombre'
							,	type:		'text'
							,	ajaxOptions:
								{
									type:		'PUT'
								}
							,	params:		function(params)
											{
												return	{
															name: params.submitValue
														}
											}
							,	pk:			function()
											{
												return	can.$(this).data('resource').attr('id')
											}
							}
						)

					_.each(
						can.$('.name-editable')
					,	function(edit)
						{
							can.$(edit).data('editable').options.url
							=	can.$(edit).data('resource').getHref()
						}
					)
				}
			,	set_permissions_editable: function()
				{
					Sigma.Model.HAL.Permissions.findAll()
						.pipe(
							function(permissions)
							{
								return	can.map(
											permissions
										,	function(permission)
											{
												return	{
															value: permission.id
														,	text: permission.name
														}
											}
										)
							}
						)
						.then(
							function(edit_source)
							{
								can.$('.permissions-editable')
									.editable(
										{
											type:		'checklist'
										,	emptytext:	'Agregar Permisos'
										,	value: 		new Array()
										,	source:		edit_source
										}
									)

								_.each(
									can.$('.permissions-editable')
								,	function(edit)
									{
										can.$(edit).data('editable').options.url
										=	can.$(edit).data('resource').getHref()

										console.log(can.$(edit).data('editable').value)

										_.each(
											can.$(edit).data('resource').permissions()
										,	function(permission)
											{
												can.$(edit).data('editable').value.push(permission.id)
											}
										)
										// can.$(edit).data('editable').value.push.apply(
										// 	can.$(edit).data('editable').value
										// ,	can.map(
										// 		can.$(edit).data('resource').permissions()
										// 	,	function(permission)
										// 		{
										// 			return	permission.id
										// 		}
										// 	)
										// )
									}
								)
							}
						)
				}
			,	set_acos_editable: function()
				{
					Sigma.Model.HAL.Acos.findAll()
						.pipe(
							function(acos)
							{
								return	can.map(
											acos
										,	function(aco)
											{
												return	{
															value:	aco.id
														,	text:	aco.name
														}
											}
										)
							}
						)
						.then(
							function(edit_source)
							{
								can.$('.acos-editable')
									.editable(
										{
											type:		'checklist'
										,	emptytext:	'Agregar Acos'
										,	value: 		new Array()
										,	source:		edit_source
										}
									)

								_.each(
									can.$('.acos-editable')
								,	function(edit)
									{
										can.$(edit).data('editable').options.url
										=	can.$(edit).data('resource').getHref()

										can.$(edit).data('editable').options.value.push.apply(
											can.$(edit).data('editable').options.value
										,	can.map(
												can.$(edit).data('resource').acos()
											,	function(aco)
												{
													return	aco.id
												}
											)
										)
									}
								)
							}
						)
				}
			,	'.add-group click': function(el,ev)
				{
					can.trigger(
						this.element
					,	'browse'
					,	{
							target: this.options.modal
						,	link: el.data('link')
						,	options:
							{
								view: this.options.view_modal
							,	bindings:
								[
									{
										selector:	'.save-group'
									,	event:		'click'
									,	who:		this.element
									,	who_event:	'save-group'
									,	what:		'form_data'
									}
								]
							}
						}
					)
				}

			,	' save-group': function(el,ev,form_data)
				{
					var	data
					=	this.options.data
					data
						.create(
							data.getHref()
						,	form_data.query
						,	'group'
						)
				}

			,	'.search keyup': function(el,ev)
				{
					if	(ev.keyCode == 13)
					{
						var	data
						=	this.options.data
						can.trigger(
							this.element
						,	'browse'
						,	{
								target:	this.options.target
							,	data:	data
											.constructor
												.filter(
													data.getHref()
												,	can.getFormData(el.parents('form')).query
												,	data.rel
												)
							}
						)
					}
				}
			}
		)
	}
)
