steal(
	'jquery'
).then(
	'./bootstrap/js/bootstrap.js'
).then(
	'./bootstrap-editable/css/bootstrap-editable.css'
,	'./bootstrap-editable/js/bootstrap-editable.js'
,	'./bootstrap-wizard/acc-wizard.min.css'
,	'./bootstrap-wizard/acc-wizard.min.js'
,	'./bootstrap-datepicker/datepicker.css'
,	'./bootstrap-datepicker/datepicker.js'
,	'./jquery-dragsort/jquery.dragsort-0.5.1.js'
,	'./bootstrap-typeahead/js/bootstrap-typeahead.js'
).then(
	function()
	{
		//	datepicker config
		$.fn.datepicker.defaults
		=	{
				weekStart: 1,
				days: ["Dom","Lun","Mar","Mie","Jue","Vie","Sab"],
				months: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
			}
	}
)