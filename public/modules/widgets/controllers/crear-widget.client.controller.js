'use strict';

angular.module('widgets').controller('CrearWidgetController', ['$scope', '$http', 'Widgets','$rootScope',
	function($scope, $http, Widgets, $rootScope) {
        $scope.urlList = 'modules/widgets/views/list-widgets.client.view.html';

        // Create new Widget
        $scope.create = function() {
            // Create new Widget object
            var widget = new Widgets ({
                name: this.name,
                title: this.title,
                seccion: this.seccion.nombre,
                attrs:{
                    value: this.title.replace(/\s+/g, '_'),
                    nombre: this.topico.nombre,
                    topico: this.topico.topico,
                    controlador: this.dispositivo.controlador
                }

            });

            // Redirect after save
            widget.$save(function(response) {
                $scope.cambiarPagina($scope.urlList);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            // Clear form fields
            this.name = '';
            this.title = '';
            this.seccion = '';
            this.attrs= '';
            this.dispositivo= '';
            this.topico= '';
            this.controlador= '';
        };

        //Creacion de un widgets
        $scope.secciones = [];
        $http.get('/seccions').success(function(data){
            $scope.seccion = data[0];
            $scope.secciones = data;
        });
        $scope.dispositivos = [];
        $http.get('/dispositivos').success(function(data){
            $scope.dispositivo = data[0];
            $scope.dispositivos = data;
        });

        //Pedir servicios para el tipo de Widget seleccionado.
        $scope.topicos = [{nombre: 'Seleccione un Sensor',topico:'Seleccione un Sensor'}];
        $scope.topico = $scope.topicos[0];
        $scope.iluminacionSelect = function(){
            $('#sens').addClass('fa fa-refresh fa-lg fa-spin');
            $('#iluminacion').addClass('alert-success');
            $('#temperatura').removeClass('alert-success');
            $('#apertura').removeClass('alert-success');
            $scope.name= 'Iluminacion';
            $scope.pedirExponerServiciosDe('luz');
        };
        $scope.temperaturaSelect = function(){
            $('#sens').addClass('fa fa-refresh fa-lg fa-spin');
            $('#temperatura').addClass('alert-success');
            $('#iluminacion').removeClass('alert-success');
            $('#apertura').removeClass('alert-success');
            $scope.name= 'Temperatura';
            $scope.pedirExponerServiciosDe('sensor');
        };
        $scope.aperturaSelect = function(){
            $('#sens').addClass('fa fa-refresh fa-lg fa-spin');
            $('#apertura').addClass('alert-success');
            $('#iluminacion').removeClass('alert-success');
            $('#temperatura').removeClass('alert-success');
            $scope.name= 'Apertura';
            $scope.pedirExponerServiciosDe('sensor');
        };
        var socket = $rootScope.socket;
        socket.emit('subscribe', {topic : 'resp/discover'});
        socket.on('resp/discover', function (msg) {
            $scope.agregarALista(msg);
        });
        $scope.agregarALista = function(msg){
            var json = JSON.parse(msg.payload);
            $scope.topicos=[];
            $scope.topicos.push({nombre: 'Seleccione un Sensor',topico:'Seleccione un Sensor'});
            if(json.sensor === undefined){
                var luces = json.luz;
                for(var i in luces){
                    $scope.topicos.push(luces[i]);
                }
            }else {
                var sensores = json.sensor;
                for(var i in sensores){
                    if((sensores[i].tipo === 'numero') && (this.name  ==='Temperatura')){
                        $scope.topicos.push(sensores[i]);
                    }
                    if((sensores[i].tipo === 'bool') && (this.name  ==='Apertura')){
                        $scope.topicos.push(sensores[i]);
                    }
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
	}
]);