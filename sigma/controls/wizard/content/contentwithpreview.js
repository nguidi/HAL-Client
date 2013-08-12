steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	'sigma/controls/form'
).then(
	function() {

		Sigma.Controls.Wizard_Content(
			'Sigma.Controls.Wizard_ContentWithPreview'
		,	{
				defaults:
				{
					view_preview:	'sigma/views/wizard/preview/step_preview.mustache'
				,	saved_form:		new can.Observe.List()
				,	preview_data:	new can.Observe()
				}
			}
		,	{
				_render_content:function(data)
				{
					this._super(data)
					
					var $steps
					=	this.element
								.find('.steps')
					$steps
						.parent()
						.addClass('container-fluid')
					
					$steps
						.addClass('span6')

					var $preview
					=	$('<div>')
					
					$preview
						.addClass('span6')
						.addClass('preview')
						.appendTo(this.element)

					this._render_preview($preview)
				}

			,	_render_preview: function(preview)
				{
					var	self
					=	this

					can.append(
						preview
					,	can.view(
							this.options.view_preview
						,	this.options.preview_data
						)
					)
				}
			}
		)
	}
)