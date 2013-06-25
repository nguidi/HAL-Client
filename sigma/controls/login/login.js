steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Control.Login'
		,	{
				defaults:
				{
					view: false
				,	target: false
				,	login_form: false
				}
			}
		,	{
				'.browseable click': function(el,ev)
				{
					if	(el.hasClass('signin'))
						this.signin(el)
					if	(el.hasClass('signup'))
						this.signup(el)
				}

			,	signin: function(el)
				{
					var	form 
					= 	can.parseFormData(
								_.extend(
									can.deparam(
										el.parents('form').serialize()
									)
								,	this.options.login_form
								||	{}
								)
							)
					,	query
					=	new Array()
					,	self
					=	this
					,	el_text
					=	el.text()

					el.text('Ingresando...')

					can.append(
							el
						,	can.$('<i class="icon-spinner icon-spin icon-large pull-left">')
						)


					if (this.checkLogin(form))
						el.data('link')
							.resolve(form)
							.then(
								function(data)
								{
									console.log("LOGIN ",data)
									if	(can.isStatusCode(data))
										self.loginFail()
									else
										self.loginSuccess(data)
								}
							)
					else
					{
						el
							.find('i.icon-spinner')
							.remove()
						el
							.text('Ingresar')
					}
				}

			,	checkLogin: function(form)
				{
					var filtered
					=	_.filter(
							form
						,	function(query)
							{
								if	(_.isNumber(query.value))
									return	false
								else
									return	_.isEmpty(query.value)
							}
						)
					,	self
					=	this
					can.each(
							filtered
						,	function(element)
							{
								self.showError(
										element
									)
							}
						)
					return _.isEmpty(filtered)
				}

			,	loginSuccess: function(resource)
				{
					this.element
							.trigger(
								'browse'
							,	{
									data:	resource
								,	target:	this.options.target
								}
							)
				}

			,	loginFail: function()
				{
					can.$('.login-form')
						.find('#username')
						.parent()
						.addClass('error')
					can.$('.login-form')
						.find('#password')
						.parent()
						.addClass('error')
					this.showError(
						(this.options.data.auth_fail) ?
							this.options.data.auth_fail
						: 	'Error!!!'
					)
				}

			,	showError: function(element)
				{
					this.element
							.find('[name="'+element.key+'"]')
							.parents('div.control-group')
							.addClass('error')
				}

			,	'[name="username"], [name="password"] change': function(el)
				{
					el
						.parents('div.control-group')
						.removeClass('error')
				}

			,	'.register click': function()
				{
					this.$login.show()
					$('#wellcome').hide()
				}
			}
		)
	}
)
