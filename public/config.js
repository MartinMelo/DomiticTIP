'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'domotictip';
	var applicationModuleVendorDependencies = [
        'ngResource',
        'ngCookies',
        'ngAnimate',
        'ngTouch',
        'ngSanitize',
        'ui.sortable',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'ui.dashboard',
        'ui.notify',
        'ui.websocket',
        'ui.models',
        'ui.widgets',
        'ngDialog',
        'config'
    ];

	// Add a new vertical module
	var registerModule = function(moduleName) {
		// Create angular module
		angular.module(moduleName, []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();