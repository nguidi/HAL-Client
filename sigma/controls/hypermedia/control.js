steal(
	'sigma/lib'
,	'sigma/util'
,	'sigma/controls/hypermedia/updatable.js'
).then(
	function()
	{
		Sigma.UpdatableControl(
			'Sigma.HypermediaControl'
		,	{
				pluginName:	'hc_generic'
			,	defaults:
				{
					view:		'//sigma/views/hypermedia/generic.mustache'
				,	view_list:	'//sigma/views/hypermedia/generic_list.mustache'
				}
			}
		,	{
				init: function(el,options)
				{
					this._super.apply(this,arguments)
				}

			,	_render_content: function(data)
				{
					if	(data instanceof can.Observe.List)
						this._render_list(data)
					else
						this._super(data)
				}

			,	_render_list: function(observe_list)
				{
					var	self
					=	this
					this.element
							.list(
								{
									loading: function()
									{
										return 'Cargando...'
									}
								,	empty: function()
									{
										return 'Vacio...'
									}
								,	view:function(obs)
									{
										return	can.view(
														self.options.list_view
													,	obs
													)
									}
								,	list: observe_list
								}
							)
				}

			,	'[data-relation] click': function(el, ev)
				{
					ev.preventDefault()
					this.element
							.trigger(
								'browse'
							,	{
									links:this.options.data.links
								,	rel:el.data('relation')
								,	name:el.data('name')
								,	target:this.options.target
								}
							)
					return false
				}
		}
		)
	}
)
