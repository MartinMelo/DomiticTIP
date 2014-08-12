'use strict';

//Setting up route
angular.module('widgets').config(['$stateProvider',
	function($stateProvider) {
		// Widgets state routing
		$stateProvider.
		state('widgets-inicio', {
			url: '/widgets-inicio',
			templateUrl: 'modules/widgets/views/widgets-inicio.client.view.html'
		}).
		state('listWidgets', {
			url: '/widgets',
			templateUrl: 'modules/widgets/views/list-widgets.client.view.html'
		}).
		state('createWidget', {
			url: '/widgets/create',
			templateUrl: 'modules/widgets/views/create-widget.client.view.html'
		}).
		state('viewWidget', {
			url: '/widgets/:widgetId',
			templateUrl: 'modules/widgets/views/view-widget.client.view.html'
		}).
		state('editWidget', {
			url: '/widgets/:widgetId/edit',
			templateUrl: 'modules/widgets/views/edit-widget.client.view.html'
		});
	}
]);