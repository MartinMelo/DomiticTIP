'use strict';

angular.module('climatizacions').controller('CrearClimatizacionController', ['$scope','Authentication','Climatizacions','$location','$http',
	function($scope,Authentication,Climatizacions,$location,$http) {
        $scope.urlList = 'modules/climatizacions/views/list-climatizacions.client.view.html';
        $scope.authentication = Authentication;



        //Agrego los dispositivos
        $scope.dispositivo = 'Seleccione Un Dispositivo';
        $http.get('/dispositivos').success(function(data){
            for(var i in data){
                $('#dispositivo').append(new Option(data[i].nombre, data[i].controlador));
            }
        });

        //Pedir servicios para el tipo de Widget seleccionado.
        $scope.topico= {'nombre': 'seleccione un Sensor' , 'topico': 'untopico'};
        $scope.controladorSelecionado = function(){
            $('#topico').empty();
            $('#sens').addClass('fa fa-refresh fa-lg fa-spin');
            $('#dispositivo option[value="Seleccione Un Dispositivo"]').remove();
            $scope.pedirExponerServiciosDe('sensor');
        };
        var ip = $location.$$host + ':3000';
        var socket = io.connect(ip);
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
            var ip = $location.$$host + ':3000';
            var socket = io.connect(ip);
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


        $scope.forma = '>';
        // Create new Climatizacion
        $scope.create = function() {
            // Create new Climatizacion object
            var climatizacion = new Climatizacions ({
                nombre: this.nombre,
                temperatura: this.temperatura,
                forma: this.forma,
                controlador: this.dispositivo,
                topico: this.topico
            });

            // Redirect after save
            climatizacion.$save(function(response) {
                $scope.cambiarPagina($scope.urlList);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            // Clear form fields
            this.nombre = '';
            this.temperatura = '';
            this.forma = '';
        };
        $scope.$on("$destroy", function() {
            socket.removeAllListeners('resp/discover');
        });
	}
]);