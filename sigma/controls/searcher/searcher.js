steal(
	'sigma/lib'
,	'sigma/util'
,	'sigma/plugins'
).then(
	'./styles.css'
).then(
	function()
	{
		can.Control(
			'Sigma.Controls.Searcher'
		,	{
				defaults:
				{
					//	KEY = CLAVE PARA  BUSQUEDA RAPIDA (SI LA DEJAS VACIA TE VA A PUTEAR)
					key:	''
				,	view:	false
					//	toFilter = LUGAR DONDE TIRA EL EVENTO PARA BUSCAR, EJEMPLO: DONDE SE ECUENTRA EL LISTADO
					//	EL NOMBRE DEL EVENTO ES "search"
				,	toFilter: false
				}
			}
		,	{
				init: function(element,options)
				{
					can.append(
						this.element
					,	can.view(
							this.options.view
						,	this.options.data
						)
					)

					this.element
							.find('.advance')
								.css('width',this.element.find('.searcher').width()-1)
				}

			,	'.advance click':function(el,ev)
				{
					ev.stopPropagation()
					ev.preventDefault()
				}

			,	'.cancel click': function()
				{
					this.hide_advance()
				}

			,	'input.search keydown': function(el,ev)
				{
					if	(_.isEqual(ev.keyCode,13))	{
						var	query
						=	{query: [{key: this.options.key, value: can.$(el).val()}]}
						this.search(query)
					}
				}

			,	'button.search click': function(el,ev)
				{
					var	input
					=	this.element.find('input.search')
					,	query
					=	{query: [{key: this.options.key, value: can.$(input).val()}]}
					this.search(query)
				}

			,	'button.advance-search click': function(el,ev)
				{
					var	parsed_form
					=	can.getFormData(this.element.find('.advance form'))
					this.search(parsed_form)
				}

			,	search: function(query)
				{
					this.hide_advance()
					can.trigger(
						this.options.toFilter
					,	'search'
					,	query
					)
				}

			,	hide_advance: function()
				{
					this.element
							.find('.btn.dropdown-toggle')
								.click()
				}
			}
		)
	}
)