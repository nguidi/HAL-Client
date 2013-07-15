steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
,	'sigma/plugins'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Control.ACL_Manager.A'
		,	{
				defaults:
				{
					view: false
				,	target: false
				,	view_modal:false
				,	modal: false
				}
			}
		,	{
				
			}
		)
	}
)
