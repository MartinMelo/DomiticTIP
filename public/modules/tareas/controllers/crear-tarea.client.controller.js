'use strict';

angular.module('tareas').controller('CrearTareaController', ['$scope', 'Authentication', 'Tareas','$rootScope','$http',
	function($scope, Authentication, Tareas, $rootScope , $http) {
        $scope.authentication = Authentication;
        $scope.urlList = 'modules/tareas/views/list-tareas.client.view.html';
        ////////////////Datos para completar el formulario/////////////////////////////////////
        //tipos de tareas automaticas
        $scope.tipo = 'Seleccione un tipo de tarea';
        $scope.tipos = ['Seleccione un tipo de tarea','Iluminacion'];
        //configuracion del calendario
        $scope.mindate = Date.now();
        $scope.hora= 12;
        $scope.minutos= 0;


        //Agrego los tipos de acciones segun el tipo seleccionado.
        $scope.accion = 'Seleccione una accion';
        $scope.acciones=['Seleccione una accion'];
        $scope.cargarAcciones = function(){
            if($scope.tipo === 'Iluminacion'){
                $scope.acciones = ['Encender', 'Apagar'];
                $scope.accion = $scope.acciones[0];
                $scope.iluminacionSelect();
            }
        };

        //Agrego los dispositivos
        $scope.dispositivos = [];
        $http.get('/dispositivos').success(function(data){
            $scope.dispositivo = data[0];
            $scope.dispositivos = data;
        });

        //Pedir servicios para el tipo de tarea seleccionado.
        $scope.topicos= [{'nombre': 'seleccione un Sensor' , 'topico': 'untopico'}];
        $scope.topico= $scope.topicos[{'nombre': 'seleccione un Sensor' , 'topico': 'untopico'}];
        $scope.iluminacionSelect = function(){
            $('#sens').addClass('fa fa-refresh fa-lg fa-spin');
            $scope.pedirExponerServiciosDe('luz');
        };
        var socket = $rootScope.socket;
        socket.emit('subscribe', {topic : 'resp/discover'});
        socket.on('resp/discover', function (msg) {
            $scope.agregarALista(msg);
        });
        $scope.topicos = [{nombre: 'Seleccione un Sensor',topico:'Seleccione un Sensor'}];
        $scope.topico = $scope.topicos[0];
        $scope.agregarALista = function(msg){
            var json = JSON.parse(msg.payload);
            if(json.luz){
                $scope.topicos=[];
                $scope.topicos.push({nombre: 'Seleccione un Sensor',topico:'Seleccione un Sensor'});
                var luces = json.luz;
                for(var i in luces){
                    $scope.topicos.push(luces[i]);
                }
            }
            $scope.topico = $scope.topicos[0];
            $scope.$digest();
            $('#sens').removeClass('fa fa-refresh fa-lg fa-spin');
        };
        $scope.pedirExponerServiciosDe = function(tipo){
            var topico = $scope.dispositivo.controlador+ '/discover';
            var mensaje = {
                topic: topico,
                payload:{
                    comando: 'exponerServicios',
                    servicio: tipo
                }
            };
            socket.emit('controlador', JSON.stringify(mensaje));
        };
        //FIN de Pedir servicios para el tipo de Widget seleccionado.


        //Crea una nueva tarea.
        $scope.create = function() {
            var fechaSeleccionada = $scope.fecha;
            fechaSeleccionada.setHours($scope.hora);
            fechaSeleccionada.setMinutes($scope.minutos);
            //Creo la tarea y la guardo.
            var tarea = new Tareas ({
                nombre: this.nombre,
                datos: {
                    tipo: this.tipo,
                    calendario: fechaSeleccionada,
                    informacion: this.accion,
                    topico: this.topico,
                    controlador: this.dispositivo.controlador
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
            this.calendario= {};
            this.informacion= {};
        };

        //Publico la tarea para que el servicio que corre las tareas se haga cargo
        $scope.publicarTarea = function(tarea){
            var mensaje = {
                topic: 'nuevaTarea',
                payload: tarea
            };
            socket.emit('schedulear' , JSON.stringify(mensaje));
        };
        $scope.$on("$destroy", function() {
            socket.removeAllListeners('resp/discover');
        });
	}
]);