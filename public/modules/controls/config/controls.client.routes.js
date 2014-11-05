'use strict';

//Setting up route
angular.module('controls').config(['$stateProvider',
	function($stateProvider) {
		// Controls state routing
		$stateProvider.
		state('partidas', {
			url: '/controls/partidas',
			templateUrl: 'modules/controls/views/partidas.client.view.html'
		}).
		state('llegadas', {
			url: '/controls/llegadas',
			templateUrl: 'modules/controls/views/llegadas.client.view.html'
		}).
		state('viewControl', {
			url: '/controls/:controlId',
			templateUrl: 'modules/controls/views/view-control.client.view.html'
		})
	}
]);