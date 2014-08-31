'use strict';

var app= angular.module('widgets');
app.directive('widgetTemperatura', ['$interval',
	function($interval) {
        return {
            restrict: 'A',
            replace: true,
            template: '<div>Value<div class="alert alert-info">{{value}}°C</div></div>',
            scope: {
                value: '=value'
            },
            link: function (scope) {
                scope.value = 'Cargando';
                var socket = io.connect('http://localhost:3000');
                socket.on('connect', function () {
                    socket.on('mqtt', function (msg) {
                        scope.value = msg.payload;
                    });
                });
                socket.emit('subscribe', {topic : 'home/#'});
                function update() {
                    var topico = 'arduino';
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
                    $interval.cancel(promise);
                });
            }
        };
	}
]);