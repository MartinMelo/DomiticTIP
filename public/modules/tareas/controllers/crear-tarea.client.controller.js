'use strict';

angular.module('tareas').controller('CrearTareaController', ['$scope', 'Authentication', 'Tareas',
	function($scope, Authentication, Tareas) {
        $scope.authentication = Authentication;
        $scope.urlList = 'modules/tareas/views/list-tareas.client.view.html';

        ////////////////Datos para completar el formulario/////////////////////////////////////

        //Seleccion de dia para tarea individual
        $scope.dia = 'Lunes';
        $scope.dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
        //tipos de tareas automaticas
        $scope.tipo = 'Iluminacion';
        $scope.tipos = ['Iluminacion'];
        //configuracion del calendario
        $scope.mindate = Date.now();
        $scope.fecha = $scope.mindate;


        //Crea una nueva tarea.
        $scope.create = function() {
            // Create new Tarea object
            var tarea = new Tareas ({
                nombre: this.nombre,
                datos: {
                    tipo: this.tipo,
                    repetir: this.repetir,
                    calendario: this.calendario,
                    informacion: this.informacion
                }
            });

            // Redirect after save
            tarea.$save(function(response) {
                $scope.cambiarPagina($scope.urlList);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            // Clear form fields
            this.nombre = '';
            this.datos = {};
            this.tipo ='';
            this.repetir = '';
            this.calendario= {};
            this.informacion= {};
        };
	}
]);