'use strict';

//Setting up route
angular.module('empleados').config(['$stateProvider',
	function($stateProvider) {
		// Empleados state routing
		$stateProvider.
		state('listEmpleados', {
			url: '/empleados',
			templateUrl: 'modules/empleados/views/list-empleados.client.view.html'
		}).
		state('viewEmpleado', {
			url: '/empleados/:empleadoId',
			templateUrl: 'modules/empleados/views/view-empleado.client.view.html'
		}).
		state('editEmpleado', {
			url: '/empleados/:empleadoId/edit',
			templateUrl: 'modules/empleados/views/edit-empleado.client.view.html'
		});
	}
]);