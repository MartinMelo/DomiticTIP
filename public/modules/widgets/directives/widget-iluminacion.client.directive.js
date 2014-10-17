'use strict';

angular.module('widgets').directive('widgetIluminacion', ['ENV',
	function(ENV) {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'modules/widgets/views/widget-iluminacion.client.view.html',
            scope: {},
            link: function (scope, elem, attr) {
                scope.luz = attr.topico;
                scope.encender = function(){
                    var ip = ENV.server +':3000';
                    var socket = io.connect(ip);
                    var topico = attr.controlador;
                    var datos2 = '{id: '+scope.luz+' , estado: on}';
                    var mensaje = {
                        topic: topico,
                        payload:{
                            comando: 'accion',
                            destino: 'iluminacion',
                            datos: datos2
                        }
                    };
                    socket.emit('controlador' , JSON.stringify(mensaje));
                };
                scope.apagar = function(){
                    var ip = ENV.server +':3000';
                    var socket = io.connect(ip);
                    var topico = attr.controlador;
                    var datos2 = '{id: '+scope.luz+' , estado: off}';
                    var mensaje = {
                        topic: topico,
                        payload:{
                            comando: 'accion',
                            destino: 'iluminacion',
                            datos: datos2
                        }
                    };
                    socket.emit('controlador' , JSON.stringify(mensaje));
                };
                scope.$on('$destroy', function () {
                });
            }
        };
	}
]);