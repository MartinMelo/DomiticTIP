'use strict';

var app= angular.module('widgets');
app.directive('widgetTemperatura', ['$interval','ENV',
	function($interval, ENV) {
        return {
            restrict: 'A',
            replace: true,
            template: '<div>Valor{{attr}}<div class="alert alert-info text-center"><b><span>{{value}}</span>°C</b></div></div>',
            scope: {
                value: '=value'
            },
            link: function (scope, elem, attr) {
                scope.value = 'Cargando';
                scope.id = attr.idinfo;
                var ip = ENV.server +':3000';
                var socket = io.connect(ip);
                socket.on('mqtt', function (msg) {
                    if(msg.topic === 'resp/'+attr.topico){
                        scope.value = msg.payload;
                        scope.$digest();
                    }
                });
                socket.emit('subscribe', {topic : 'resp/'+attr.topico});
                function update() {
                    var topico = attr.controlador;
                    var posicion = attr.topico.split('/')[1];
                    var datos = '{id: temperatura , posicion:' + posicion+'}';
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

                var promise = $interval(update, 5000);

                scope.$on('$destroy', function () {
                    socket.removeAllListeners('resp/'+attr.topico);
                    $interval.cancel(promise);
                });
            }
        };
	}
]);

