steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Control.ACL_Manager.Home'
		,	{
				defaults:
				{
					view: false
				,	target: false
				}
			}
		,	{
			}
		)
	}
)
