'use strict';

//Setting up route
angular.module('configuracion').config(['$stateProvider',
	function($stateProvider) {
		// Configuracion state routing
		$stateProvider.
		state('conf', {
			url: '/conf',
			templateUrl: 'modules/configuracion/views/conf.client.view.html'
		}).
		state('configuracion', {
			url: '/configuracion',
			templateUrl: 'modules/configuracion/views/configuracion.client.view.html'
		});
	}
]);