'use strict';

var app= angular.module('widgets');
app.directive('widgetTemperatura', ['$interval',
	function($interval) {
        return {
            restrict: 'A',
            replace: true,
            template: '<div>Value{{attr}}<div class="alert alert-info"><span  id="{{id}}">{{value}}</span>°C</div></div>',
            scope: {
                value: '=value'
            },
            link: function (scope, elem, attr) {
                scope.value = 'Cargando';
                scope.id = attr.idinfo;
                var socket = io.connect('http://localhost:3000');
                socket.on('connect', function () {
                    socket.on('controlador', function (msg) {
                        if(msg.topic === attr.topico){
                            $('#'+ attr.idinfo).html(msg.payload);
                        }
                    });
                });
                socket.emit('subscribe', {topic : attr.topico});
                function update() {
                    var topico = attr.controlador;
                    var datos = '{id: temperatura , posicion: ambiente}';
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
                    socket.emit('unsubscribe', {topic : attr.topico});
                    $interval.cancel(promise);
                });
            }
        };
	}
]);

