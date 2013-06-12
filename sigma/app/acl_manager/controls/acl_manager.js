steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
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
								media_types:
								{
									'topbar':
									{
										Handler:	Sigma.Control.Menu
									,	options:
										{
											view:	'//sigma/app/acl_manager/views/main/topbar.mustache'
										,	target:	'Content'
										}
									}
								,	'content':
									{
										Handler:	Sigma.Control.Menu
									,	navegable_control:	Sigma.Hypermedia.ACL_Manager.Content
									,	options:
										{
											view:	'//sigma/app/acl_manager/views/main/topbar.mustache'
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
				}
			}
		)
	}
)
