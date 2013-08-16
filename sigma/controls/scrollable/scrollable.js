steal(
	'sigma/controls/hypermedia/control.js'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Control.Scrollable'
		,	{
				defaults:{
					view_more: '//stock/views/scrollable/more.mustache'
				,	view_content: false
				}
			,	nextPage : false
			,	lastPage: false
			}
		,	{
				_render_content: function(data)
				{
					console.log(data)
					this.bindScrollEnable = true
					var exists = 	this.element.find('div').hasClass('content') 
					||		this.element.find('div').hasClass('more')

					if (!exists) {
						this._render_scrollable_content(data)
						this._render_scrollable_more(data)
					} 
					this._update_content(data)					
				}

			,	_render_scrollable_content: function(data)
				{
					can.append(
						this.element
					,	can.$('<div class="content">')
					)
				}

			,	_render_scrollable_more: function(data)
				{
					can.append(
						this.element
					,	can.$('<div class="more">')
					)
				}

			,	_update_content: function (data)
				{
					can.append(
						this.element
							.find('div.content')
					,	can.view(
							this.options.view_content
						,	data
						)
					)

					this.element
						.find('div.more')
						.empty()

					can.append(
						this.element
							.find('div.more')
					,	can.view(
							this.options.view_more
						,	data
						)
					)
				}

			,	shouldILoadMore: function(el,ev)
				{
					return	can.$(el).height() + can.$(el).scrollTop() == can.$(document).height() 
					&& 	this.options.slot.attr('more')
					&&	this.bindScrollEnable
				}

			,	'button.more click' : function(element,event)
				{
					this._more_content(element,event)
				}
			,	'{window} scroll': function(el,ev)
				{
					if (this.shouldILoadMore(el,ev))
					{
						this.bindScrollEnable = false
						this._more_content(this.element.find('button.more'),ev)
					}
				}
			,	_more_content: function(element,event)
				{
					if(element.data('more'))
					{
						// var	self 
						// = 	this
						// ,	def 
						// = 	this.options.slot.constructor.getRoot(
						// 		element.data('more').href
						// 	,	this.options.slot.rel
						// 	)
						// this._update(def)
						// def.then(
						// 	function(obj)
						// 	{
						// 		self.bindScrollEnable = true
						// 		element.data('more',obj.links.more)
						// 	}
						// )
						can.trigger(
							this.element
						,	'browse'
						,	{
								link:	element.data('more')
							}
						)
					}
				}
			}
		)
	}
)