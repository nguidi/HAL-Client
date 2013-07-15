steal(
	'sigma/models'
).then(
	function()
	{
		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Roots'
		,	{}
		,	{}
		)

		Sigma.Model.HAL.Resource(
			'Sigma.Model.HAL.Menus'
		,	{}
		,	{}
		)

		test(
			"Resource model"
		,	function()
			{
				stop()
				Sigma.Model.HAL.Roots.fetch('http://trabajando:3003/api/data/welcomes/1','root')
				.then(
					function(root_data)
					{
						ok(root_data,'Resolved OK')
						ok(root_data instanceof Sigma.Model.HAL.Roots,'Resource Type OK')
						ok(root_data.links.get_link_by_rel('signup'),'Signup Link OK')
						ok(root_data.links.get_link_by_rel('signin'),'Signin Link OK')
						ok(root_data.links.get_link_by_rel('signout'),'Signout Link OK')
						stop()
						root_data.links.get_link_by_rel('signup').resolve({username: 'test_user', password: '12345', id_profile: 1})
						.then(
							function(signup_data)
							{
								console.log(signup_data)
								ok(signup_data,'Resolved OK')
								ok(signup_data.attr('status') == 'OK' && signup_data.attr('code') == '200','Singup OK')
								stop()
								root_data.links.get_link_by_rel('signin').resolve({query: [{key: 'username', value: 'test_user'},{key: 'password', value: '12345'}]})
								.then(
									function(signin_data)
									{
										console.log(signin_data)
										ok(signin_data,'Resolved OK')
										ok(signin_data.attr('username') == 'test_user' && signin_data.attr('password') == '12345','User Loged In OK')
										stop()
										Sigma.Model.HAL.Menus.fetch('http://trabajando:3003/api/data/menus/1','menu')
										.then(
											function(menu_data)
											{
												console.log(menu_data)
												ok(menu_data,'Resolved OK')
												ok(menu_data instanceof Sigma.Model.HAL.Menus,'Resource Type OK')
												stop()
												root_data.links.get_link_by_rel('signout').resolve()
												.then(
													function(signout_data)
													{
														console.log(signout_data)
														ok(signout_data,'Resolved OK')
														ok(signout_data.attr('status') == 'OK' && signout_data.attr('code') == '200','Singup OK')
														start()
													}
												)
												start()
											}
										)
										start()
									}
								)
								start()
							}
						)
						start()
					}
				)	
			}
		)
	}
)
