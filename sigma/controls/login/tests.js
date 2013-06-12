steal(
	'sigma/stock/controls/lib'
,	'sigma/stock/controls/login'
,	'sigma/stock/controls/login/fixtures.js'
).then(
	function()
	{
		module(
			"sigma/stock/controls"
		)
		test(
			"Login"
		,	function()
			{
				the_root = Sigma.Model.HAL.Resource.getRoot('/api')

				var login = can.$('<div id="login">')

				stop()
				the_root.then(
					function(data)
					{
						new	Sigma.Controls.Login(
								login
							,	{
									links:data.links
								}
							)
						start()
						equal(data.constructor.fullName,"Sigma.Model.HAL.Resource","Resource Generated")
						equal(login.length,1,"Login Generated")
					}
				)
			}
		)
	}
)
