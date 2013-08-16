steal(
	'sigma/controls/hypermedia/control.js'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Control.Modal'
		,	{
				defaults:
				{
					view: false
				,	bindings: []
				}
			}
		,	{
				_render_content: function(data)
				{
					var	$element
					=	this.element
					,	$modal
					=	can.append(
							this.element
						,	can.view(
								this.options.view
							,	data
							)
						)

					$modal
						.modal(
							'show'
						)

					this.options.$modal
					=	$modal

					if	(!_.isEmpty(this.options.bindings))
						this._bind_elements(this.options.bindings)
				}

			,	_bind_elements: function(bindings)
				{
					var	$element
					=	this.element
					,	self
					=	this
					,	$modal
					=	this.options.$modal

					can.each(
						bindings
					,	function(binding,index)
						{
							can.bind.call(
								$element.find(binding.selector)
							,	binding.event
							,	function(el,ev)
								{
									can.trigger(
										binding.who
									,	binding.who_event
									,	(
											_.isFunction(self[binding.what])
										&&	self[binding.what]()
										)
									||	(
											_.isFunction(binding.what)
										&&	binding.what()
										)
									||	undefined
									)

									$modal
										.modal(
											'hide'
										)
								}
							)							
						}
					)
				}

			,	form_data: function()
				{
					return	can.getFormData(this.element.find('form'))
				}
			}
		)
	}
)
