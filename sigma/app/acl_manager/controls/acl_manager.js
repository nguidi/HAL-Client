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
											'home':
											{
												Handler: Sigma.Control.ACL_Manager.Home
											,	inicializable: true
											,	options:
												{
													target: 'Content'
												,	view: '//sigma/app/acl_manager/views/main/init.mustache'
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

					new Sigma.Hypermedia.ACL_Manager(this.element,data)
				}
			}
		)
	}
)
