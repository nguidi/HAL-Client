steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
,	'sigma/controls/topbar'
,	'sigma/app/acl_manager/models/menus.js'
,	'sigma/app/acl_manager/models/contents.js'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Control.ACL_Manager'
		,	{
				defaults:
				{
					view: false
				,	target: false
				}
			}
		,	{
				_render_content: function(data)
				{
					this._super(data)
					
					Sigma.HypermediaNavegableControl(
						'Sigma.Hypermedia.ACL_Manager'
					,	{
							defaults:
							{
								containers:
								{
									'topbar':
									{
										Handler:	Sigma.Control.Topbar
									,	url: 		'http://trabajando:3003/api/data/menus/1'
									,	resource: 	Sigma.Model.HAL.Menu
									,	options:
										{
											view:	'//sigma/app/acl_manager/views/main/topbar.mustache'
										,	target:	'Content'
										}
									}
								,	'content':
									{
										media_types:
										{
											'option_1':
											{
												Handler: Sigma.HypermediaControl
											,	resource: Sigma.Model.HAL.Content
											,	url: 'http://trabajando:3003/api/data/contents/1'
											,	inicializable: true
											,	options:
												{
													target: 'Content'
												,	view_home: '//sigma/app/acl_manager/views/main/init.mustache'
												}
											}
										,	'option_2':
											{
												Handler: Sigma.HypermediaControl
											,	resource: Sigma.Model.HAL.Content
											,	options:
												{
													target: 'Content'
												,	view_home: '//sigma/app/acl_manager/views/main/init.mustache'
												}
											}
										} 
									}
								,	'footer':
									{
										Handler:	Sigma.HypermediaControl
									,	url: 		'http://trabajando:3003/api/data/footers/1'
									,	resource: 	Sigma.Model.HAL.Footer
									,	options:
										{
											view:	'//sigma/app/acl_manager/views/main/topbar.mustache'
										}
									}
								}
							}
						}
					,	{
						}
					)

					new Sigma.Hypermedia.ACL_Manager(can.$('body'))
				}
			}
		)
	}
)
