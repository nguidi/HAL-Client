steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	'sigma/controls/form'
).then(
	function() {

		Sigma.HypermediaControl(
			'Sigma.Controls.Wizard_ContentPreviewer'
		,	{
			}
		,	{
			}
		)
	}
)