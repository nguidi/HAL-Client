steal(
	'sigma/controls/menu'
).then(
	function()
	{
		Sigma.Control.Menu(
			'Sigma.Control.Topbar'	
		,	{

			}
		,	{
				'.browseable click': function(el,ev)
				{
					if	(el.hasClass('signout'))
						this.signout(el)
					else
						this._super(el,ev)
				}

			,	signout: function(el)
				{
					el.data('link')
						.resolve()
						.then(
							function(data)
							{
								console.log(data)
							}
						)
				}
			}
		)
	}
)