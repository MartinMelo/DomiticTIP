'use strict';

angular.module('tareas').controller('CrearTareaController', ['$scope', 'Authentication', 'Tareas',
	function($scope, Authentication, Tareas) {
        $scope.authentication = Authentication;
        $scope.urlList = 'modules/tareas/views/list-tareas.client.view.html';

        // Create new Tarea
        $scope.create = function() {
            // Create new Tarea object
            var tarea = new Tareas ({
                name: this.name
            });

            // Redirect after save
            tarea.$save(function(response) {
                $scope.cambiarPagina($scope.urlList);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            // Clear form fields
            this.name = '';
        };
	}
]);