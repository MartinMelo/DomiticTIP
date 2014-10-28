'use strict';

module.exports = {
	app: {
		title: 'DomoticTIP',
		description: 'Integración de tecnología para control y automatización de espacio físico.',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 9000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/font-awesome/css/font-awesome.min.css',
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/malhar-angular-dashboard/dist/angular-ui-dashboard.css',
				'public/lib/ng-grid/ng-grid.css',
                'public/lib/nvd3/nv.d3.css',
                'public/lib/ngDialog/css/ngDialog.css',
                'public/lib/ngDialog/css/ngDialog-theme-default.css',
                'public/lib/ngDialog/css/ngDialog-theme-plain.css'
			],
			js: [
                'public/lib/jquery/jquery.js',
                'public/lib/jquery-ui/jquery-ui.js',
                'public/lib/lodash/dist/lodash.js',
				'public/lib/angular/angular.js',
				'public/lib/socket.io-client/socket.io.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
                'public/lib/angular-pines-notify/src/pnotify.js',
                'public/lib/pines-notify/pnotify.core.js',
                'public/lib/visibilityjs/lib/visibility.core.js',
                'public/lib/d3/d3.js',
                'public/lib/nvd3/nv.d3.js',
				'public/lib/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js',
                'public/lib/ng-grid/ng-grid-2.0.11.min.js',
				'public/lib/angular-ui-sortable/sortable.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/malhar-angular-dashboard/dist/angular-ui-dashboard.js',
                'public/lib/malhar-angular-widgets/dist/malhar-angular-widgets.js',
                'public/lib/ngDialog/js/ngDialog.js',
                'public/lib/later/later.js',
                'public/lib/schedule/schedule.js',
                'public/config_env.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.js'

			]
		},
		css: [
			'public/modules/**/css/*.css',
            'public/modules/**/*/dist/*.css'

		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*/dist/*.js',
			'public/modules/*/*/src/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};