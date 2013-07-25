steal(
	'can/util/fixture'
,	'sigma/hal/hal_builder.js'
,	function()
	{
		can.fixture(
			'GET /posts'
		,	function()
			{
			var	genActions
			=	function(url)
				{
				return can
					.map(
						[
							{id: 'me-gusta', value:'Me Gusta', icon: 'thumbs-up'}
						,	{id:'plusone', value:'1', icon: 'plus'}
						]
					,	function(action)
						{
						return	{
								title: action.value
							,	icon: action.icon
							,	align: 'right'
							,	href: url+'/actions/'+action.id
							}
						}
					)
				}
			var	genComments
			=	function(url,i)
				{
				return	can.map(
						can.grep(
							[
								{of: 0, owner: 'Tragalibrencio', value: 'Yo me se todo!' ,icon: 'heart' }
							,	{of: 0, owner: 'Trollencio', value: 'Machetes listos' ,icon: 'film'}
							,	{of: 1, owner: 'Forever Alone', value: 'Alquien quiere ir conmigo?' ,icon: 'ok' }
							,	{of: 1, owner: 'Putencia', value: 'Oh Pinochio!' ,icon: 'off'}
							,	{of: 1, owner: 'Black Catter', value: 'Me parecio aver visto un lindo gatito' ,icon: 'home' }
							,	{of: 2, owner: 'Bad Luck Brian', value: 'Me lo compre y me trajo tornillos adentro' ,icon: 'lock' }
							]
						,	function(comment)
							{
								return comment.of == i
							}
						)
					,	function(comment,index)
						{
						return  new Sigma.fixtures
							.hal_builder(
								{
									title: comment.owner
								,	icon: comment.icon
								,	description: comment.value
								,	icon_align: (index % 2) ? 'right' : 'left'
								,	rel: 'comment'
								}
							,	url+'/comments'+'/'+comment.owner
							).link(
								{
									'actions': genActions(url+'/comments'+'/'+comment.owner)
								}
							)
						}
					)
				}

			var genPost
			=	function()
				{
				return can
					.map(
						[
							{owner: 'Yao Ming', value: 'Hoy tengo examen', icon: 'print'}
						,	{owner: 'Nerdencio', value: 'Hoy se estrena Star Wars VII: El ataque de Ponchio', icon: 'camera'}
						,	{owner: 'Frikencio', value: 'Ya tengo el nuevo Iphone, a solo 16k', icon: 'book'}
						]
					,	function(post,index)
						{
						return	new Sigma.fixtures
							.hal_builder(
								{
									title: post.owner
								,	icon:  post.icon
								,	description: post.value
								,	align: 'left'
								,	icon_align: 'left'
								,	rel: 'posts'
								}
							,	'/posts/'+post.owner
							).link(
								{
									'comments':
									{
										href:'/comments'
									}
								,	'actions': genActions('/posts/'+post.owner)
								}
							).embedded(
								{
									'comments': genComments('/posts/'+post.owner,index)
								}
							)
						}
					)
				}
			return	new Sigma.fixtures
				.hal_builder(
					{
					}
				,	'/stream'
				).link(
					{
						'posts':
							{
								href:'/posts'
							}
					}
				).embedded(
					{
						'posts': genPost()
					}
				).get_document()
			}
		)
	}
)
