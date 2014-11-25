'use strict';

// Empleados controller
angular.module('empleados').controller('EmpleadosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Empleados',
	function($scope, $stateParams, $location, Authentication, Empleados ) {
		$scope.authentication = Authentication;
		// Find a list of Empleados
		$scope.find = function() {
			$scope.empleados = Empleados.query();
		};

		// Find existing Empleado
		$scope.findOne = function() {
			$scope.empleado = Empleados.get({ 
				empleadoId: $stateParams.empleadoId
			});
		};
	}
]);