'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/domotictip',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
                'public/lib/malhar-angular-dashboard/dist/angular-ui-dashboard.js',
                'public/lib/ng-grid/ng-grid.css'
			],
			js: [
                'public/lib/jquery/jquery.js',
                'public/lib/jquery-ui/jquery-ui.js',
                'public/lib/lodash/dist/lodash.js',
                'public/lib/angular/angular.js',
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
                'public/lib/malhar-angular-widgets/dist/malhar-angular-widgets.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	}
};