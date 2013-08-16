steal(
	'sigma/stock/controls/scrollable'
,	'sigma/stock/controls/scrollable/adapters.js'
).then(
	function()
	{
		module(
			"sigma/stock/controls"
		)
		test(
			"Scrollable"
		,	function()
			{
				var 	scrollable_container
				,	scrollableHTML = can.$('<div id="scrollableContainer">')

				Sigma.HypermediaContainer(
					'Sigma.Hypermedia.Scrollable.Container'
				,	{
						defaults:
						{
							media_types:
							{
								'scrollable':
								{
									Handler: Sigma.Controls.Scrollable
								,	options:
									{
										target: 'scrollable'
									,	view_content: '//sigma/stock/controls/scrollable/views/content.mustache'
									,	view_more: '//stock/views/scrollable/more.mustache'
									}
								}
							}
						}
					}
				,	{
					}
				)

				can.fixture(
					'GET /pageable-scrollable'
				,	steal
						.idToUri("//stock/fixtures/data/json/pageable-scrollable.json")
						.path
				)

				stop()
				Sigma.fixtures.collection.scrollable.getCollectionsFixturator(
					Sigma.fixtures.collection.getCollection("/pageable-scrollable")
				).then(
					function()
					{
						start()
						var scrollable_container = new Sigma.Hypermedia.Scrollable.Container(
							scrollableHTML
						,	{
								id:'Scrollable'
							,	target: 'Scrollable'
							,	slot: Sigma.Model.HAL.Collection.getRoot('/pageable-scrollable?items-per-page=5','scrollable')
							}
						)

						stop()
						scrollable_container.options.slot
							.then(
								function(page1)
								{
									start()
									ok(page1.links, "Page 1: links OK");
									ok(page1.embedded, "Page 1: embedded OK");
									ok(page1.links.more, "Page 1: links.more OK");
									ok(page1.embedded.collection, "Page 1: _embedded.items OK");
									stop()
									page1.links.more.fetch()
										.then(
											function(page2)
											{
												start()
												ok(page2.links, "Page 2: links OK");
												ok(page2.embedded, "Page 2: embedded OK");
												ok(page2.links.more, "Page 2: links.more OK");
												ok(page2.embedded.collection, "Page 2: _embedded.items OK");
											}
										)
								}
							)
					}
				)
			}
		)
	}
)
