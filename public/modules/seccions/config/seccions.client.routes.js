'use strict';

//Setting up route
angular.module('seccions').config(['$stateProvider',
	function($stateProvider) {
		// Seccions state routing
		$stateProvider.
		state('listSeccions', {
			url: '/seccions',
			templateUrl: 'modules/seccions/views/list-seccions.client.view.html'
		}).
		state('createSeccion', {
			url: '/seccions/create',
			templateUrl: 'modules/seccions/views/create-seccion.client.view.html'
		}).
		state('viewSeccion', {
			url: '/seccions/:seccionId',
			templateUrl: 'modules/seccions/views/view-seccion.client.view.html'
		}).
		state('editSeccion', {
			url: '/seccions/:seccionId/edit',
			templateUrl: 'modules/seccions/views/edit-seccion.client.view.html'
		});
	}
]);