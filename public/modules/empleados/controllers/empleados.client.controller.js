'use strict';

// Empleados controller
angular.module('empleados').controller('EmpleadosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Empleados',
	function($scope, $stateParams, $location, Authentication, Empleados ) {
		$scope.authentication = Authentication;

		// Create new Empleado
		$scope.create = function() {
			// Create new Empleado object
			var empleado = new Empleados ({
                nombre: this.nombre
			});

			// Redirect after save
			empleado.$save(function(response) {
				$location.path('empleados/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.nombre = '';
		};

		// Remove existing Empleado
		$scope.remove = function( empleado ) {
			if ( empleado ) { empleado.$remove();

				for (var i in $scope.empleados ) {
					if ($scope.empleados [i] === empleado ) {
						$scope.empleados.splice(i, 1);
					}
				}
			} else {
				$scope.empleado.$remove(function() {
					$location.path('empleados');
				});
			}
		};

		// Update existing Empleado
		$scope.update = function() {
			var empleado = $scope.empleado ;

			empleado.$update(function() {
				$location.path('empleados/' + empleado._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

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