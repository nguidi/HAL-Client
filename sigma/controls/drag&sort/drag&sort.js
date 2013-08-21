steal(
	'sigma/controls/hypermedia/control.js'
,	'sigma/plugins'
).then(
	'./styles.css'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Control.Dragger'
		,	{
				defaults:
				{
					view:		false
				,	view_box:	false
				,	view_item:	false
				,	editable:	false
				,	new:		false
				,	available:	false
				,	removable:	false
				,	box_action:	false 
				,	box_name:	"Nuevo Box"
				,	reset_btn:	can.$('<button type="button" class="close">&times;</button>')
				,	minus_btn:	can.$('<button type="button" class="min"><i class="icon-minus"></button>')
				,	plus_btn:	can.$('<button type="button" class="max"><i class="icon-plus"></i></button>')
				,	remove_btn:	can.$('<button type="button" class="remove"><i class="icon-remove"></i></i></button>')
				}
			}
		,	{
				_render_content: function(data)
				{
					// TODO: SALVAR - VER METODO this.DRAGEND
					this._super(data)

					var	self
					=	this

					if	(this.options.editable)
						_.each(
							this.element.find('.dragger-box .title')
						,	this.setEditable
						)

					if	(this.options.available)
						this.setDragAvailable()

					if	(this.options.removable)	{
						this.element
								.find('.dragger-item')
									.prepend(
										self.options.reset_btn.clone()
									)
						this.element
								.find('.available .dragger-item button.close')
									.hide()
					}

					if	(this.options.box_action)
						this.element
								.find('.sorteable .dragger-box')
									.prepend(
										this.options.minus_btn.clone()
									)
									.prepend(
										this.options.remove_btn.clone()
									)
					
					this.setDragSort()
				}

			,	setDragSort: function()
				{
					this.element
							.find('.dragger-box ul')
								.dragsort(
									{
										dragBetween: true
									,	dragEnd: this.dragEnd
									,	dragRemove:	this.options.reset_btn.clone()
									}
								)
				}

			,	setDragAvailable: function()
				{
					can.append(
							this.element.find('.available')
						,	can.view(
								this.options.view_available
							,	this.options.available
							)
						)
				}

			,	setEditable: function(title)
				{
					can.$(title)
							.tooltip(
								{
									title: 'Presione para editar'	
								}
							)

					can.$(title)
							.editable(
								{
									type:			'text'
								,	title:			'Nombre del Grupo'
								,	highlight:		false
								,	showbuttons:	false
								,	mode:			'inline'
								,	inputclass:		'input-xlarge'
								}
							)
							.removeClass('editable-click')
				}

			,	getNewBoxName: function()
				{
					var	news
					=	this.element.find('div.dragger-box h4.title:contains("'+this.options.box_name+'")')
					
					return	this.options.box_name
						+	(
								news.length
								?	" "+(news.length+1)
								:	""
							)
				}

			,	'button.drag-new-box click': function()
				{
					can.append(
						this.element.find('.sorteable')
					,	can.view(
							this.options.view_box
						,	new can.Observe(
								{
									title:	this.getNewBoxName()
								}
							)
						)
					)

					this.setEditable(
							this.element.find('.sorteable .dragger-box:last .title')
						)

					this.element
							.find('.dragger-box ul')
								.dragsort('destroy')

					if	(this.options.box_action)
						this.element
								.find('.sorteable .dragger-box:last')
									.prepend(
										this.options.minus_btn.clone()
									)
									.prepend(
										this.options.remove_btn.clone()
									)

					this.setDragSort()
				}

			,	'button.close click': function(el)
				{
					var	item
					=	el.parent('.dragger-item')
							.parent('li')

					this.insertIntoAvailable(item.clone())

					item
						.remove()
				}

			,	insertIntoAvailable: function(item)
				{
					item
						.find('button.close')
							.hide()

					can.append(
						this.element.find('.available .dragger-box ul')
					,	item
							.appendTo(
								can.$('<li>')
							)
					)				
				}

			,	'button.remove click': function(el)
				{
					var	item
					=	can.$(el)
							.parent('.dragger-box')
								.find('ul li .dragger-item')
					
					this.insertIntoAvailable(item)

					el
						.parent('.dragger-box')
							.remove()
				}

			,	'button.min click': function(el)
				{
					el
						.parent('.dragger-box')
							.find('ul')
								.toggle()

					el.unbind()

					el
						.replaceWith(this.options.plus_btn.clone())
				}

			,	'button.max click': function(el)
				{
					el
						.parent('.dragger-box')
							.find('ul')
								.toggle()

					el.unbind()

					el
						.replaceWith(this.options.minus_btn.clone())
				}

			,	dragEnd: function(dragged)
				{
					if	(can.$(dragged).parents('.sorteable').length)	{
						can.$(dragged)
								.find('div.dragger-item')
									.find('button.close')
											.show()
					}	else	{
						can.$(dragged)
								.find('div.dragger-item')
										.find('button.close')
											.hide()
					}
					// TODO: SALVAR EN ALGUN LADO
				}
			}
		)
	}
)
