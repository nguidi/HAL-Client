steal(
	'sigma/lib'
,	'sigma/util'
).then(
	function()
	{
		can.Control(
			'Sigma.Controls.Typeahead'
		,	{
				defaults:
				{
					source:	[]
				,	items:	8
				,	menu:	'<ul class="typeahead dropdown-menu"></ul>'
				,	view_item:	'//sigma/views/typeahead/li.mustache'
				,	val:	'id'
				,	display: 'name'
				,	itemSelected: function () { }
				,	hal:	false
				,	ajax_default:
					{
						url: null
					,	timeout: 300
					,	method: 'post'
					,	triggerLength: 3
					,	loadingClass: null
					,	displayField: null
					,	preDispatch: null
					,	preProcess: null
					}
				}
			}
		,	{
				init: function(element,options)
				{
					this.$element = element
					this.$menu = $(this.options.menu).appendTo('body');
					this.shown = false
					this.source = this.options.source
					var self = this

					if (!this.options.source.length)	{
						var ajax = this.options.ajax

						if (typeof ajax === 'string')	{
							this.ajax = can.extend({}, this.options.ajax_default, { url: ajax })
						}	else	{
							this.ajax = can.extend({}, this.options.ajax_default, ajax)
						}

						if (!this.ajax.url)	{
							this.ajax = null
						}
					}
				}

				//=============================================================================================================
				//
				//  AJAX
				//
				//=============================================================================================================

				//------------------------------------------------------------------
				//
				//  Handle AJAX source 
				//
			,	ajaxer: function ()
				{ 
					var	self
					=	this
					,	query
					=	self.$element.val()

					if (query === self.query)	{
				    	return self
					}

					// Query changed
					self.query
					=	query

					// Cancel last timer if set
					if (self.ajax.timerId) {
				    	clearTimeout(self.ajax.timerId)
				    	self.ajax.timerId = null
					}

					if (!query || query.length < self.ajax.triggerLength) {
						// Cancel the ajax callback if in progress
						if (self.ajax.xhr) {
							self.ajax.xhr.abort()
							self.ajax.xhr = null
							self.ajaxToggleLoadClass(false)
						}

						return self.shown ? self.hide() : self
					}

					// Query is good to send, set a timer
					self.ajax.timerId
					=	setTimeout(
							function()
							{
								self.ajaxExecute(query)
							}
						,	self.ajax.timeout
						)
					        
					return self
				}

				//------------------------------------------------------------------
				//
				//  Execute an AJAX request
				//
			,	ajaxExecute: function(query)
				{
						this.ajaxToggleLoadClass(true)

						// Cancel last call if already in progress
						if (this.ajax.xhr) this.ajax.xhr.abort()

						var params = this.ajax.preDispatch ? this.ajax.preDispatch(query) : { query : query }
						var jAjax = (this.ajax.method === "post") ? $.post : $.get
						this.ajax.xhr = jAjax(this.ajax.url, params, $.proxy(this.ajaxLookup, this))
						this.ajax.timerId = null
				}

				//------------------------------------------------------------------
				//
				//  Perform a lookup in the AJAX results
				//
			,	ajaxLookup: function (data)
				{ 
					var items

					this.ajaxToggleLoadClass(false)

					if (!this.ajax.xhr) return

					if (this.ajax.preProcess) {
						data = this.ajax.preProcess(data)
					}

					// Save for selection retreival
					this.ajax.data = data

					items = this.grepper(this.ajax.data)

					if (!items || !items.length) {
						return this.shown ? this.hide() : this
					}

					this.ajax.xhr = null

					return this.render(items.slice(0, this.options.items)).show()
				}

				//------------------------------------------------------------------
				//
				//  Toggle the loading class
				//
			,	ajaxToggleLoadClass: function (enable)
				{
					if (!this.ajax.loadingClass) return
					this.$element.toggleClass(this.ajax.loadingClass, enable)
				}

				//=============================================================================================================
				//
				//  Data manipulation
				//
				//=============================================================================================================

				//------------------------------------------------------------------
				//
				//  Search source
				//
			,	lookup: function (event)
				{
					var self = this,
						items

					if (self.ajax) {
						self.ajaxer()
					}
					else {
						self.query = self.$element.val()

						if (!self.query) {
							return self.shown ? self.hide() : self
						}

						items = self.grepper(self.source)

						if (!items || !items.length) {
							return self.shown ? self.hide() : self
						}

						return self.render(items.slice(0, self.options.items)).show()
					}
				}

				//------------------------------------------------------------------
				//
				//  Filters relevent results 
				//
			,	grepper: function(data)
				{
					var self = this,
						items
					if (this.options.hal)	{
						var	data
						=	data._embedded
						&&	data._embedded.collection
					}

					if (_.isEmpty(data) || (data && data.length && !data[0].hasOwnProperty(self.options.display))) {                
						return null
					} 

					items = $.grep(data, function (item) {
						return self.matcher(item[self.options.display], item)
					})

					return this.sorter(items)                
				}

				//------------------------------------------------------------------
				//
				//  Looks for a match in the source
				//
			,	matcher: function (item)
				{
					return ~item.toLowerCase().indexOf(this.query.toLowerCase())
				}

				//------------------------------------------------------------------
				//
				//  Sorts the results
				//
			,	sorter: function (items)
				{
					var self = this,
						beginswith = [],
						caseSensitive = [],
						caseInsensitive = [],
						item

					while (item = items.shift()) {
						if (!item[self.options.display].toLowerCase().indexOf(this.query.toLowerCase())) {
							beginswith.push(item)
						}
						else if (~item[self.options.display].indexOf(this.query)) {
							caseSensitive.push(item)
						}
						else {
							caseInsensitive.push(item)
						}
					}

					return beginswith.concat(caseSensitive, caseInsensitive)
				}

				//=============================================================================================================
				//
				//  DOM manipulation
				//
				//=============================================================================================================

				//------------------------------------------------------------------
				//
				//  Shows the results list
				//
			,	show: function ()
				{
					var pos = $.extend({}, this.$element.offset(), {
						height: this.$element[0].offsetHeight
					})

					this.$menu.css({
						top: pos.top + pos.height,
						left: pos.left
					})

					this.$menu.show()
					this.shown = true

					return this
				}

				//------------------------------------------------------------------
				//
				//  Hides the results list
				//
			,	hide: function ()
				{
					this.$menu.hide()
					this.shown = false
					return this
				}

				//------------------------------------------------------------------
				//
				//  Highlights the match(es) within the results
				//
			,	highlighter: function (item)
				{
					var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
					return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
						return '<strong>' + match + '</strong>'
					})
				}

				//------------------------------------------------------------------
				//
				//  Renders the results list
				//
			,	render: function (items)
				{
					var self = this
					this.$menu
							.empty()
					
					can.map(
						items instanceof can.Observe.List
						?	items
						:	new can.Observe.List(items)
					,	function(item,i)
						{
							can.append(
								self.$menu
							,	can.view(
									self.options.view_item
								,	item
								)
							)

							self.$menu
									.find('li:last')
										.data('item',item)
										.attr('data-value', item[self.options.val])
										.attr('data-label', item[self.options.display])
										.bind(
											{
												//------------------------------------------------------------------
												//
												//  Handles clicking on the results list
												//
												click: function (e)
												{
													e.stopPropagation()
													e.preventDefault()
													self.select()
												}
												//------------------------------------------------------------------
												//
												//  Handles the mouse entering the results list
												//
											,	mouseover: function (e)
												{
													self.$menu.find('.active').removeClass('active')
													$(e.currentTarget).addClass('active')
												}
											}		
										)
							var	inner
							=	self.$menu
										.find('li:last a')
							,	inner_children_cloned
							=	inner.children().clone()
							inner
								.html(
									self.highlighter(item[self.options.display], item)
								).append(
									inner_children_cloned
								)
										// .contents()
										// 	.text(
										// 		function ()
										// 		{
										// 			console.log(this)
										// 			return $(this)
										// 						.text()
										// 							.replace(
										// 								item[self.options.display]
										// 							,	self.highlighter(item[self.options.display], item)
										// 							)
										// 		}
										// 	)
						}
					)

					this.$menu
							.find('li:first')
								.addClass('active')

					return this
				}

				//------------------------------------------------------------------
				//
				//  Item is selected
				//
			,	select: function ()
				{
					var $selectedItem = this.$menu.find('.active')
					this.$element.val($selectedItem.attr('data-label')).change()
					this.options.itemSelected($selectedItem, $selectedItem.attr('data-value'), $selectedItem.attr('data-label'))
					return this.hide()
				}

				//------------------------------------------------------------------
				//
				//  Selects the next result
				//
			,	next: function (event)
				{
					var active = this.$menu.find('.active').removeClass('active')
					var next = active.next()

					if (!next.length) {
						next = $(this.$menu.find('li')[0])
					}

					next.addClass('active')
				}

				//------------------------------------------------------------------
				//
				//  Selects the previous result
				//
			,	prev: function (event)
				{
					var active = this.$menu.find('.active').removeClass('active')
					var prev = active.prev()

					if (!prev.length) {
						prev = this.$menu.find('li').last()
					}

					prev.addClass('active')
				}

				//=============================================================================================================
				//
				//  Events
				//
				//=============================================================================================================

				//------------------------------------------------------------------
				//
				//  Listens for user events
				//
				//------------------------------------------------------------------
				//
				//  Handles a key being raised up
				//
			,	' keyup': function(element,e)
				{
					e.stopPropagation()
					e.preventDefault()

					switch (e.keyCode) {
						case 40:
							// down arrow
						case 38:
							// up arrow
							break
						case 9:
							// tab
						case 13:
							// enter
							if (!this.shown) {
								return
							}
							this.select()
							break
						case 27:
							// escape
							this.hide()
							break
						default:
							this.lookup()
					}
				}

				//------------------------------------------------------------------
				//
				//  Handles cursor exiting the textbox
				//
			,	' blur': function (el,e)
				{
					var	self
					=	this

					e.stopPropagation()
					e.preventDefault()

					setTimeout(
						function()
						{
							if (!self.$menu.is(':focus'))	{
								self.hide()
							}
						}
					,	150
					)
				}

				//------------------------------------------------------------------
				//
				//  Handles a key being pressed
				//
			,	' keydown': function (el,e)
				{
						e.stopPropagation()

						if (!this.shown) {
							return
						}

						switch (e.keyCode) {
							case 9:
								// tab
							case 13:
								// enter
							case 27:
								// escape
								e.preventDefault()
								break
							case 38:
								// up arrow
								e.preventDefault()
								this.prev()
								break
							case 40:
								// down arrow
								e.preventDefault()
								this.next()
								break
						}
				}
			}
		)
	}
)