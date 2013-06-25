steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
,	'sigma/plugins'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Control.ACL_Manager.Groups'
		,	{
				defaults:
				{
					view: false
				,	target: false
				}
			}
		,	{
				// _render_content:function(data)
				// {
				// 	this._super(data)
				// }
			}
		)
	}
)
