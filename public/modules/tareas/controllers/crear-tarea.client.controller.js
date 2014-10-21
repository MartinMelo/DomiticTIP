'use strict';

angular.module('tareas').controller('CrearTareaController', ['$scope', 'Authentication', 'Tareas','ENV',
	function($scope, Authentication, Tareas, ENV) {
        $scope.authentication = Authentication;
        $scope.urlList = 'modules/tareas/views/list-tareas.client.view.html';

        ////////////////Datos para completar el formulario/////////////////////////////////////

        //Seleccion de dia para tarea individual
        $scope.dia = 'Lunes';
        $scope.dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
        //tipos de tareas automaticas
        $scope.tipo = 'Seleccione un tipo de tarea';
        $scope.tipos = ['Seleccione un tipo de tarea','Iluminacion'];
        //configuracion del calendario
        $scope.mindate = Date.now();

        //Agrego los tipos de acciones segun el tipo seleccionado.
        $scope.accion = 'Seleccione una accion';
        $scope.acciones=['Seleccione una accion'];
        $scope.cargarAcciones = function(){
            if($scope.tipo === 'Iluminacion'){
                $scope.acciones = ['Encender', 'Apagar'];
                $scope.accion = $scope.acciones[0];
            }
        };

        //Crea una nueva tarea.
        $scope.create = function() {
            var fechaSelecciona = $scope.fecha;
            //Creo la tarea y la guardo.
            var tarea = new Tareas ({
                nombre: this.nombre,
                datos: {
                    tipo: this.tipo,
                    repetir: this.repetir,
                    calendario: this.fecha,
                    informacion: this.accion
                }
            });

            // Redirect after save
            tarea.$save(function(response) {
                $scope.publicarTarea(tarea);
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

        //Publico la tarea para que el servicio que corre las tareas se haga cargo
        $scope.publicarTarea = function(tarea){
            var ip = ENV.server + ':3000';
            var socket = io.connect(ip);
            var mensaje = {
                topic: 'nuevaTarea',
                payload: tarea
            };
            socket.emit('schedulear' , JSON.stringify(mensaje));
        };
	}
]);