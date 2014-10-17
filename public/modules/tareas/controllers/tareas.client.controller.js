'use strict';

// Tareas controller
angular.module('tareas').controller('TareasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tareas',
	function($scope, $stateParams, $location, Authentication, Tareas ) {
		$scope.authentication = Authentication;

		// Create new Tarea
		$scope.create = function() {
			// Create new Tarea object
			var tarea = new Tareas ({
				name: this.name
			});

			// Redirect after save
			tarea.$save(function(response) {
				$location.path('tareas/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Tarea
		$scope.remove = function( tarea ) {
			if ( tarea ) { tarea.$remove();

				for (var i in $scope.tareas ) {
					if ($scope.tareas [i] === tarea ) {
						$scope.tareas.splice(i, 1);
					}
				}
			} else {
				$scope.tarea.$remove(function() {
					$location.path('tareas');
				});
			}
		};

		// Update existing Tarea
		$scope.update = function() {
			var tarea = $scope.tarea ;

			tarea.$update(function() {
				$location.path('tareas/' + tarea._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tareas
		$scope.find = function() {
			$scope.tareas = Tareas.query();
		};

		// Find existing Tarea
		$scope.findOne = function() {
			$scope.tarea = Tareas.get({ 
				tareaId: $stateParams.tareaId
			});
		};
	}
]);