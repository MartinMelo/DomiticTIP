'use strict';

angular.module('widgets').controller('EditarWidgetController', ['$scope', '$http', 'Widgets','Authentication','$location',
	function($scope, $http, Widgets, Authentication,$location) {
        $scope.authentication = Authentication;
        $scope.urlList = 'modules/widgets/views/list-widgets.client.view.html';
        // Update existing Widget
        $scope.update = function() {
            var widget = $scope.widget;
            if (this.topico.indexOf('Seleccione')<0){
                widget.attrs.topico = this.topico;
            }
            widget.attrs.value = widget.title.replace(/\s+/g, '_');
            widget.attrs.controlador = this.dispositivo.controlador;
            if(this.name) {
                widget.name = this.name;
            }
            widget.seccion = this.seccion.nombre;

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
            $('#topico').empty();
            $('#sens').addClass('fa fa-refresh fa-lg fa-spin');
            $('#iluminacion').addClass('alert-success');
            $('#temperatura').removeClass('alert-success');
            $('#apertura').removeClass('alert-success');
            $scope.name= 'Iluminacion';
            $scope.pedirExponerServiciosDe('luz');
        };
        $scope.temperaturaSelect = function(){
            $('#topico').empty();
            $('#sens').addClass('fa fa-refresh fa-lg fa-spin');
            $('#temperatura').addClass('alert-success');
            $('#iluminacion').removeClass('alert-success');
            $('#apertura').removeClass('alert-success');
            $scope.name= 'Temperatura';
            $scope.pedirExponerServiciosDe('sensor');
        };
        $scope.aperturaSelect = function(){
            $('#topico').empty();
            $('#sens').addClass('fa fa-refresh fa-lg fa-spin');
            $('#apertura').addClass('alert-success');
            $('#iluminacion').removeClass('alert-success');
            $('#temperatura').removeClass('alert-success');
            $scope.name= 'Apertura';
            $scope.pedirExponerServiciosDe('sensor');
        };
        var ip=$location.$$host +':3000'
        var socket = io.connect(ip);
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
            var socket = io.connect('http://localhost:3000');
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