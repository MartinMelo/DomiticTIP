'use strict';

//Setting up route
angular.module('climatizacions').config(['$stateProvider',
	function($stateProvider) {
		// Climatizacions state routing
		$stateProvider.
		state('listClimatizacions', {
			url: '/climatizacions',
			templateUrl: 'modules/climatizacions/views/list-climatizacions.client.view.html'
		}).
		state('createClimatizacion', {
			url: '/climatizacions/create',
			templateUrl: 'modules/climatizacions/views/create-climatizacion.client.view.html'
		}).
		state('viewClimatizacion', {
			url: '/climatizacions/:climatizacionId',
			templateUrl: 'modules/climatizacions/views/view-climatizacion.client.view.html'
		}).
		state('editClimatizacion', {
			url: '/climatizacions/:climatizacionId/edit',
			templateUrl: 'modules/climatizacions/views/edit-climatizacion.client.view.html'
		});
	}
]);