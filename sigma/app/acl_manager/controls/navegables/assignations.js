steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
,	'sigma/controls/modal'
).then(
	function() {
						
		Sigma.HypermediaNavegableControl(
			'Sigma.Hypermedia.Assignations'
		,	{
				defaults:
				{
					containers:
					{
						'grupos':
						{
							Handler:	Sigma.HypermediaControl
						,	options:
							{
								view:	'//sigma/app/acl_manager/views/assignations/grupos.mustache'
							,	target:	'Content'
							}
						}
					,	'acos':
						{
							Handler:	Sigma.HypermediaControl
						,	options:
							{
								view:	'//sigma/app/acl_manager/views/assignations/acos.mustache'
							,	target:	'Content'
							}
						}
					,	'asociaciones':
						{
							Handler:	Sigma.HypermediaControl
						,	options:
							{
								view:	'//sigma/app/acl_manager/views/assignations/asociaciones.mustache'
							,	target:	'Content'
							}
						}
					}
				}
			}
		,	{
			}
		)
	}
)