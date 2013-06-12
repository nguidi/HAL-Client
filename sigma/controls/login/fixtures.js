steal(
	'sigma/model/hal.js'
).then(
    function(){
		can.fixture("GET /api"
		,	function()
			{
			var	genOpenIds
			=	function(url)
				{
				return can
					.map(
						[
							{	name:'facebook'
							,	title:'Facebook'
							}
						,	{	name:'google_plus'
							,	title:'Google+'
							}
						,	{	name:'linkedin'
							,	title:'LinkedIn'
							}
						,	{	name:'twitter'
							,	title:'Twitter'
							}
						]
					,	function(open_id)
						{
						return	{
								title: open_id.title
							,	icon: Sigma.fixtures.getIcon(open_id.name)
							,	href: '/api/login/'+open_id.name
							}
						}
					)
				}
			return	new HAL_Resource(
					{
					}
				,	'/api'
				).link(
					{
						login:
							{
								href:'/api/token'
							,	title:'Entrar'
							}
					,	open_ids:
							genOpenIds()
					}
				)
			}
		)
		can.fixture("GET /api/token"
		,	function(orig,settings,headers)
			{
			return	{
					_links:{
						self:	{ href:orig.url }
					,	profile:	{ href:can.sub('/api/{username}',orig.data) }
					,	_profile:	{ href:'/profile/session' }
					}
				,	greeting:'Juan Perez'
				,	username:orig.data.username
				,	token:'XXXXXXTOKEN'
				,	name:'session'
				}
			}
		)
		can.fixture("GET /api/login/{service}"
		,	function(orig,settings,headers)
			{
			return	{
					_links:{
						self:	{ href:orig.url }
					,	profile:	{ href:'/api/{username}' }
					,	_profile:	{ href:'/profile/session' }
					}
				,	greeting:'Juan Perez'
				,	username:'jperez'
				,	name:'session'
				}
			}
		)
	}
)
