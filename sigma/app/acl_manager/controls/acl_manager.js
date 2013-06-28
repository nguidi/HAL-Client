steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
,	'sigma/controls/topbar'
,	'sigma/app/acl_manager/controls/groups.js'
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
												Handler: Sigma.HypermediaControl //Sigma.Control.ACL_Manager.Home
											,	options:
												{
													target: 'Content'
												,	view: '//sigma/app/acl_manager/views/main/init.mustache'
												}
											}
										,	'aros':
											{
												Handler: Sigma.HypermediaControl
											,	options:
												{
													target: 'Content'
												,	view: '//sigma/app/acl_manager/views/main/init.mustache'
												}
											}
										,	'acos':
											{
												Handler: Sigma.HypermediaControl
											,	options:
												{
													target: 'Content'
												,	view:	'//sigma/app/acl_manager/views/acos/init.mustache'
												}
											}
										,	'grupos':
											{
												Handler: Sigma.Control.ACL_Manager.Groups
											,	options:
												{
													target: 'Content'
												,	view: '//sigma/app/acl_manager/views/groups/init.mustache'
												}
											}
										,	'asignacion':
											{
												Handler: Sigma.HypermediaControl
											,	options:
												{
													target: 'Content'
												,	view: '//sigma/app/acl_manager/views/main/init.mustache'
												}
											}
										} 
									}
								,	'footer':
									{
										Handler:	Sigma.HypermediaControl
									,	options:
										{
											view:	'//sigma/app/acl_manager/views/main/footer.mustache'
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
