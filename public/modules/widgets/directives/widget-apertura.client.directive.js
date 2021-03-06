'use strict';

angular.module('widgets').directive('widgetApertura', ['$interval','$rootScope',
    function($interval, $rootScope) {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'modules/widgets/views/widget-apertura.client.view.html',
            scope: {
                value: '=value',
                clase: '=clase'
            },
            link: function (scope, elem, attr) {
                scope.value = 'Cargando';
                //scope.idW= attr.topico + attr.value;
                scope.idW= scope.$id;
                var socket = $rootScope.socket;
                socket.on('mqtt', function (msg) {
                    if(msg.topic === 'resp/'+attr.topico){
                        cambiarEstadoPuerta(msg.payload);
                    }
                });
                socket.emit('subscribe', {topic : 'resp/'+attr.topico});

                function cambiarEstadoPuerta(estado) {
                    if (estado === 'true') {
                        scope.value='Cerrado';
                        $('#' + scope.idW).removeClass('alert-danger alert-info').addClass('alert-success');
                    }else {
                        scope.value='Abierto';
                        $('#' + scope.idW).removeClass('alert-success alert-info').addClass('alert-danger');
                    }
                    scope.$digest();
                }
                function update() {
                    var topico = attr.controlador;
                    var posicion = attr.topico.split('/')[1];
                    var datos = '{id: puertas , posicion:' + posicion+'}';
                    var mensaje = {
                        topic: topico,
                        payload:{
                            comando: 'accion',
                            destino: 'sensores',
                            datos: datos
                        }
                    };
                    socket.emit('controlador' , JSON.stringify(mensaje));
                }

                update();

                scope.$on('$destroy', function () {
                    socket.removeAllListeners('resp/'+attr.topico);
                });
            }
        };
    }
]);

