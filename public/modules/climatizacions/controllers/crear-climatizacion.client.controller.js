'use strict';

angular.module('climatizacions').controller('CrearClimatizacionController', ['$scope','Authentication','Climatizacions','$rootScope','$http',
	function($scope,Authentication,Climatizacions,$rootScope,$http) {
        $scope.urlList = 'modules/climatizacions/views/list-climatizacions.client.view.html';
        $scope.authentication = Authentication;



        //Agrego los dispositivos
        $scope.dispositivos = [];
        $http.get('/dispositivos').success(function(data){
            $scope.dispositivos = data;
            $scope.dispositivo = data[0];
            $scope.controladorSelecionado();
        });


        //Pedir servicios para el tipo de Widget seleccionado.
        $scope.topico= {'nombre': 'seleccione un Sensor' , 'topico': 'untopico'};
        $scope.controladorSelecionado = function(){
            $('#topico').empty();
            $('#sens').addClass('fa fa-refresh fa-lg fa-spin');
            $scope.pedirExponerServiciosDe('sensor');
        };
        var socket = $rootScope.socket;
        socket.emit('subscribe', {topic : 'resp/discover'});
        socket.on('resp/discover', function (msg) {
            $scope.agregarALista(msg);
        });
        $scope.agregarALista = function(msg){
            var json = JSON.parse(msg.payload);
            $('#topico').append(new Option('Seleccione Un Sensor', 'Seleccione Un Sensor'));
            var sensores = json.sensor;
            for(var i in sensores){
                if(sensores[i].tipo === 'numero'){
                    $('#topico').append(new Option(sensores[i].nombre, sensores[i].topico));
                }
            }
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
        //FIN de Pedir servicios para el tipo de Climatizacion seleccionada.


        $scope.forma = '>';
        // Create new Climatizacion
        $scope.create = function() {
            // Create new Climatizacion object
            var climatizacion = new Climatizacions ({
                nombre: this.nombre,
                temperatura: this.temperatura,
                forma: this.forma,
                dispositivo: this.dispositivo._id,
                topico: this.topico
            });
            $scope.climatizacion = climatizacion;
            // Redirect after save
            climatizacion.$save(function(response) {
                $scope.publicarClimatizacion();
                $scope.cambiarPagina($scope.urlList);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            // Clear form fields
            this.nombre = '';
            this.temperatura = '';
            this.forma = '';
        };
        $scope.publicarClimatizacion= function(){
            var topico = $scope.dispositivo.controlador;
            var sensor = $scope.climatizacion.topico;
            var grados = $scope.climatizacion.temperatura;
            var estado = $scope.climatizacion.forma;
            var datos2 = '{sensor: '+sensor+' , grados: ' + grados +' , estado: ' + estado+'}';
            var mensaje = {
                topic: topico,
                payload:{
                    comando: 'accion',
                    destino: 'climatizacion',
                    datos: datos2
                }
            };
            socket.emit('controlador' , JSON.stringify(mensaje));
        };
        $scope.$on("$destroy", function() {
            socket.removeAllListeners('resp/discover');
        });
	}
]);