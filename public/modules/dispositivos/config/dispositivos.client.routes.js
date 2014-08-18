'use strict';

//Setting up route
angular.module('dispositivos').config(['$stateProvider',
	function($stateProvider) {
		// Dispositivos state routing
		$stateProvider.
		state('listDispositivos', {
			url: '/dispositivos',
			templateUrl: 'modules/dispositivos/views/list-dispositivos.client.view.html'
		}).
		state('createDispositivo', {
			url: '/dispositivos/create',
			templateUrl: 'modules/dispositivos/views/create-dispositivo.client.view.html'
		}).
		state('viewDispositivo', {
			url: '/dispositivos/:dispositivoId',
			templateUrl: 'modules/dispositivos/views/view-dispositivo.client.view.html'
		}).
		state('editDispositivo', {
			url: '/dispositivos/:dispositivoId/edit',
			templateUrl: 'modules/dispositivos/views/edit-dispositivo.client.view.html'
		});
	}
]);