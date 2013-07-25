steal(
	'sigma/stock/controls/lib'
,	'sigma/stock/controls/dropdown'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.Searcher'
		,	{
				defaults:{
					view_filter: false
				,	data_render: false
				,	rapid_search: false
				}
			}
		,	{
				_render_content: function(data)
				{

				var 	data_render 
				= 	this.options.data_render
				,	self 
				=	this
					if(can.isArray(data_render))
					{
						can.each(
							data_render
						,	function(item)
							{
							var	emb 
							= 	data.embedded[item]
								?data.embedded[item]
								:data.links[item].fetch()
							,	resolve
							=	emb

								if(can.isDeferred(emb))
								{
									emb.then(
										function(link_resolve)
										{
											//console.log("Link resolver deferred: ",link_resolve)
											resolve = link_resolve
										}
									)
								}

								can.each(
									resolve.embedded.collection
								,	function(itema)
									{
										if(itema.name == 'search')
										{
											data.attr('search_button', itema)
											data.attr('advance_search', itema)
										}
									}
								)

								data.attr(item,resolve.embedded.collection)
							}
						)
					}
					else
					{
					var	emb = data.embedded[data_render]	
						data.attr(data_render, emb.embedded.collection)
					}

					can.append(
						this.element
					,	can.$('<div class="filter">')
							.append(can.view(this.options.view_filter,data))
					)

					new Sigma.Controls.Dropdown(
						can.$('.filter')
					)
					
				}
			,	'button#search click' : function(element,event)
				{
					//console.log(element.data('search_button'))
					var data = element.parent('div').find('input#appendedInputButton').val()
					if(this.options.rapid_search)
						this._data_trigger_rapid_search(data)
					else
					{
						var params = {n_centro: data}
						this.element.trigger(
							'browse_data'
						,	{
								rel: can.underscore(this.options.target_content)
							,	target: this.options.target_content
							,	storage: this.options.slot.storage
							,	params: params
							}
						)
					}
				}
			,	'input#appendedInputButton keypress' : function(element,event)
				{
					if(event.charCode==13)
					{
						this._data_trigger_rapid_search(can.$(element).val())	
					}
				}
			,	_data_trigger_rapid_search : function(data_search)
				{
					can.trigger(
						$('div.hc_generic')
					,	'rapid_search'
					,	data_search
					)
				}

			,	'button#advance_search click' : function(element,event)
				{
					// Tengo q tratarlo asi porque pierde el Resource Type 
					// y el Rel entonces no me lo reconoce el HContainer
				var	params = {}
					can.each(
						can.deparam(element.parents('form').serialize())
					,	function(item, index)
						{
							if(item!="" && item!=undefined)
								params[index] = item
						}
					)
					this.element.trigger(
						'browse_data'
					,	{
							rel: can.underscore(this.options.target_content)
						,	target: this.options.target_content
						,	storage: this.options.slot.storage
						,	params: params
						}
					)
				}
			}
		)
	}
)
