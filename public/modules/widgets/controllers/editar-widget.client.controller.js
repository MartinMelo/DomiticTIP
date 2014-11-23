'use strict';

angular.module('widgets').controller('EditarWidgetController', ['$scope', '$http', 'Widgets','Authentication','$rootScope',
	function($scope, $http, Widgets, Authentication,$rootScope) {
        $scope.authentication = Authentication;
        $scope.urlList = 'modules/widgets/views/list-widgets.client.view.html';
        // Update existing Widget
        $scope.update = function() {
            var widget = $scope.widget;
            if (this.topico && this.topico.nombre.indexOf('Seleccione')<0){
                widget.attrs.nombre = this.topico.nombre;
                widget.attrs.topico = this.topico.topico;
            }
            widget.attrs.value = widget.title.replace(/\s+/g, '_');
            widget.attrs.controlador = this.dispositivo.controlador;
            widget.attrs.dispositivo = this.dispositivo._id;
            if(this.name) {
                widget.name = this.name;
            }
            widget.seccion = this.seccion._id;

            widget.$update(function() {
                $scope.idView = widget._id;
                $scope.cambiarPagina($scope.urlList);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        //Cargar Widget Por ID
        $scope.cargarUno = function() {
            $scope.widget = Widgets.get({
                widgetId: $scope.idView
            });
        };


        //Creacion de un widgets
        $scope.secciones = [];
        var querySecciones = '{"user": "'+ $scope.authentication.user._id+'"}';
        $http.get('/seccions/query/' + querySecciones).success(function(data){
            $scope.secciones = data;
            $scope.seccion = data[0];
        });
        $scope.dispositivos = [];
        $http.get('/dispositivos').success(function(data){
            $scope.dispositivos = data;
            $scope.dispositivo = data[0];
        });

        $scope.topico = 'Seleccione Un Sensor';
        /**
         * Para hacer el query al controlador.
         */
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
        /**
         * fin de los querys al controlador
         */
	}
]);