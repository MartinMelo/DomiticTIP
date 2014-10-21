'use strict';

// Tareas controller
angular.module('tareas').controller('TareasController', ['$scope', '$stateParams', 'Authentication', 'Tareas',
	function($scope, $stateParams, Authentication, Tareas ) {
		$scope.authentication = Authentication;
        $scope.urlList = 'modules/tareas/views/list-tareas.client.view.html';
        $scope.urlCreate = 'modules/tareas/views/create-tarea.client.view.html';
        $scope.urlView = 'modules/tareas/views/view-tarea.client.view.html';
        $scope.urlEdit = 'modules/tareas/views/edit-tarea.client.view.html';


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
                    $scope.cambiarPagina($scope.urlList);
				});
			}
		};

		// Update existing Tarea
		$scope.update = function() {
			var tarea = $scope.tarea ;

			tarea.$update(function() {
                $scope.cambiarPagina($scope.urlList);
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
        // Find existing Seccion
        $scope.cargarUna = function() {
            $scope.tarea = Tareas.get({
                tareaId: $scope.idView
            });
        };
	}
]);