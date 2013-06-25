steal(
	'sigma/lib'
,	'sigma/util'
).then(
	function()
	{
		can.Control(
			'Sigma.UpdatableControl'
		,	{
				defaults:
				{
					loading:	'//sigma/views/hypermedia/loading.mustache'
				,	empty:		'//sigma/views/hypermedia/empty.mustache'
				,	failed:		'//sigma/views/hypermedia/failed.mustache'
				,	slot:		false
				,	container:	false
				,	target:		false
				}
			,	rendered : false
			,	setup:	function()
				{
					var	result
					=	this._super.apply(this,arguments)
					Sigma.UpdatableControl.NO_DATA
					=	false
					return	result
				}
			}
		,	{
				init:	function(el,options)
				{
					can.each(
						this.options
					,	this.proxy(
							function(val,prop)
							{
								if(/^view/.test(prop))
									this.options[prop]=steal.idToUri(val).path
							}
						)
					)
					can.each(
						['loading','empty']
					,	this.proxy(
							function(what)
							{
								this.options[what]=steal.idToUri(this.options[what]).path
							}
						)
					)

					this._render_loading()
					if(!this.options.container)
						throw 'Control must have an "container" property'
					if(!this.options.target)
						this.options.target=this.options.container
					this.update(options)
				}
			,	update:	function(options)
				{
					var	data
					=	this.options.slot
					if	(data && data.isComputed)
						data
						=	data()
					this._update(data)
				}
			,	_update: function(data)
				{
					data
					=	data
					||	Sigma.UpdatableControl.NO_DATA
					if	(can.isDeferred(data))
					{
						data
							.then(
								can.proxy(
										this._update
									,	this
									)
							,	can.proxy(
										this._render_failed
									,	this
									)
							)
					}
					else	
						if	(data==Sigma.UpdatableControl.NO_DATA)
							this._render_empty()
						else
						{
							this.set_data(data)
							// this.on()
							this.clean_rendered()
							this._render_content(this.options.data)
						}
				}
			,	set_data: function(data)
				{
					this.options.data
					=	(data instanceof can.Observe)
						?	data
						:	new can.Observe(data)
				}
			,	clean_rendered: function()
				{
					var self = this
					can.each(
						['empty','loading','failed']
					,	function()
						{
							self.element
								.find('div.uc-'+this)
								.remove()
						}
					)
				}
			,	_render_loading: function()
				{
					can.append(
							this.element
						,	can.$('<div class="uc-loading">')
								.html(
									can.view(
										this.options.loading
									,	new can.Observe(
											{
												message : 'Cargando...'
											}
										)
									)
								)
						)
				}
			,	_render_content: function(data_to_render)
				{
					can.append(
							this.element
						,	can.view(
								this.options.view
							,	data_to_render
							)
						)
				}
			,	_render_empty: function()
				{
					can.append(
							this.element
						,	can.$('<div class="uc-loading">')
								.html(
									can.view(
										this.options.empty
									,	new can.Observe(
											{
												message : 'Vacio...'
											}
										)
									)
								)
						)
				}
			,	_render_failed: function()
				{
					can.append(
							this.element
						,	can.$('<div class="uc-loading">')
								.html(
									can.view(
										this.options.failed
									,	new can.Observe(
											{
												message : 'Fallo...'
											}
										)
									)
								)
						)
				}
			,	'{slot} change': function(target, ev, newVal)
				{
					if	(target.isComputed)
						this._update(newVal)
				}
			}
		)
	}
)
