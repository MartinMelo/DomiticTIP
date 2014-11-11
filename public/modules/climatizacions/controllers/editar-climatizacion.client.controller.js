'use strict';

angular.module('climatizacions').controller('EditarClimatizacionController', ['$scope','Authentication','Climatizacions','$rootScope','$http',
    function($scope,Authentication,Climatizacions,$rootScope,$http) {
        $scope.urlList = 'modules/climatizacions/views/list-climatizacions.client.view.html';
        $scope.authentication = Authentication;



        //Agrego los dispositivos
        $scope.dispositivo = 'Seleccione Un Dispositivo';
        $http.get('/dispositivos').success(function(data){
            for(var i in data){
                $('#dispositivo').append(new Option(data[i].controlador, data[i].controlador));
            }
        });

        //Pedir servicios para el tipo de Widget seleccionado.
        $scope.topico= 'Seleccione Un Sensor';
        $scope.controladorSelecionado = function(){
            $('#topico').empty();
            $('#sens').addClass('fa fa-refresh fa-lg fa-spin');
            $('#dispositivo option[value="Seleccione Un Dispositivo"]').remove();
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
        //FIN de Pedir servicios para el tipo de Climatizacion seleccionada.



        // Update existing Climatizacion
        $scope.update = function() {
            var climatizacion = $scope.climatizacion ;
            if($scope.topico){
                climatizacion.topico = $scope.topico;
            }
            if($scope.dispositivo.indexOf('Seleccion'<0)){
                climatizacion.controlador = $scope.dispositivo.controlador;
            }
            climatizacion.$update(function() {
                $scope.cambiarPagina($scope.urlList);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.cargarUno = function() {
            $scope.climatizacion = Climatizacions.get({
                climatizacionId: $scope.idView
            });
        };
        $scope.$on("$destroy", function() {
            socket.removeAllListeners('resp/discover');
        });
    }
]);