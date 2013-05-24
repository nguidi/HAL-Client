var	use_less=false
;(
	(use_less)
		?steal(	'steal/less'
		,	'bootstrap/less/bootstrap.less'
		,	'bootstrap/less/responsive.less'
		)
		:steal(	'bootstrap/docs/assets/css/bootstrap.css'
		,	'bootstrap/docs/assets/css/bootstrap-responsive.css'
		)
)