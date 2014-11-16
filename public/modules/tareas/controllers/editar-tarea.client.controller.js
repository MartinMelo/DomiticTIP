'use strict';

angular.module('tareas').controller('EditarTareaController', ['$scope', 'Authentication', 'Tareas','$rootScope','$http',
	function($scope, Authentication, Tareas, $rootScope , $http) {
        $scope.authentication = Authentication;
        $scope.urlList = 'modules/tareas/views/list-tareas.client.view.html';
        //configuracion del calendario
        $scope.mindate = Date.now();
        ////////////////Datos para completar el formulario/////////////////////////////////////
        //tipos de tareas automaticas
        $scope.tipo = 'Seleccione un tipo de tarea';
        $scope.tipos = ['Seleccione un tipo de tarea','Iluminacion'];
        //Sensor
        $scope.topico = 'Seleccione Un Sensor';
        //Agrego los dispositivos
        $scope.dispositivo = 'Seleccione un Dispositivo';
        $http.get('/dispositivos').success(function(data){
            for(var i in data) {
                $('#dispositivo').append(new Option(data[i].nombre, data[i].controlador));
            }
        });
        //Traer la tarea de db.
        $scope.cargarUna = function() {
            Tareas.get({tareaId: $scope.idView}).$promise.then(function(data){
                $scope.tarea = data;
                var fecha = new Date(data.datos.calendario);
                $scope.hora = fecha.getHours();
                $scope.minutos = fecha.getMinutes();
            });
        };

        //Agrego los tipos de acciones segun el tipo seleccionado.
        $scope.accion = 'Seleccione una accion';
        $scope.acciones=['Seleccione una accion'];
        $scope.cargarAcciones = function(){
            if($scope.tipo === 'Iluminacion' && $scope.dispositivo.indexOf('Seleccione un')<0){
                $scope.acciones = ['Encender', 'Apagar'];
                $scope.accion = $scope.acciones[0];
                $scope.iluminacionSelect();
            }
        };
        //Pedir servicios para el tipo de tarea seleccionado.
        $scope.topicos= [{'nombre': 'seleccione un Sensor' , 'topico': 'untopico'}];
        $scope.topico= $scope.topicos[{'nombre': 'seleccione un Sensor' , 'topico': 'untopico'}];
        $scope.iluminacionSelect = function(){
            $('#topico').empty();
            $('#sens').addClass('fa fa-refresh fa-lg fa-spin');
            $scope.pedirExponerServiciosDe('luz');
        };
        var socket = $rootScope.socket;
        socket.emit('subscribe', {topic : 'resp/discover'});
        socket.on('resp/discover', function (msg) {
            $scope.agregarALista(msg);
        });
        $scope.agregarALista = function(msg){
            var json = JSON.parse(msg.payload);
            $('#topico').append(new Option('Seleccione Un Sensor', 'Seleccione Un Sensor'));
            if(json.sensor === undefined){
                var luces = json.luz;
                for(var i in luces){
                    $('#topico').append(new Option(luces[i].nombre, luces[i].topico));
                }
                this.topico =luces[0].topico;
            }else {
                var sensores = json.sensor;
                for(var i in sensores){
                    if((sensores[i].tipo === 'numero') && (this.name  ==='Temperatura')){
                        $('#topico').append(new Option(sensores[i].nombre, sensores[i].topico));
                    }
                    if((sensores[i].tipo === 'bool') && (this.name  ==='Apertura')){
                        $('#topico').append(new Option(sensores[i].nombre, sensores[i].topico));
                    }
                }
            }
            $('#sens').removeClass('fa fa-refresh fa-lg fa-spin');
        };
        $scope.pedirExponerServiciosDe = function(tipo){
            var topico = $scope.dispositivo+ '/discover';
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

        /////////////////////UPDATE DE LA TAREA////////////////////////////////////////
        // Update existing Tarea
        $scope.update = function() {
            var tarea = $scope.tarea ;

            tarea.$update(function() {
                $scope.cambiarPagina($scope.urlList);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
	}
]);