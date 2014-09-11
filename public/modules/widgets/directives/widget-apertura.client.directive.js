'use strict';

angular.module('widgets').directive('widgetApertura', ['$interval',
    function($interval) {
        return {
            restrict: 'A',
            replace: true,
            template: '<div>Value{{attr}}<div class="alert alert-info text-center" id="{{id}}" >{{value}}</div></div>',
            scope: {
                value: '=value'
            },
            link: function (scope, elem, attr) {
                scope.value = 'Cargando';
                scope.id = attr.idinfo;
                var socket = io.connect('http://localhost:3000');
                socket.on('connect', function () {
                    socket.on('mqtt', function (msg) {
                        if(msg.topic === 'resp/'+attr.topico){
                            cambiarEstadoPuerta(msg.payload);
                        }
                    });
                });
                socket.emit('subscribe', {topic : 'resp/'+attr.topico});

                function cambiarEstadoPuerta(estado) {
                    if (estado === 'true') {
                        $('#' + attr.idinfo).html('<b>Cerrado</b>');
                        $('#' + attr.idinfo).removeClass('alert-danger').addClass('alert-success');
                    }else {
                        $('#' + attr.idinfo).html('<b>Abierto</b>');
                        $('#' + attr.idinfo).removeClass('alert-info').addClass('alert-danger');
                    }
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

                var promise = $interval(update, 2000);

                scope.$on('$destroy', function () {
                    socket.emit('unsubscribe', {topic : 'resp/' + attr.topico});
                    $interval.cancel(promise);
                });
            }
        };
    }
]);

