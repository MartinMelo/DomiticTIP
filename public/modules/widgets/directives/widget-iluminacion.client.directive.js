'use strict';

angular.module('widgets').directive('widgetIluminacion', [
	function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'modules/widgets/views/widget-iluminacion.client.view.html',
            scope: {},
            link: function (scope, elem, attr) {
                scope.luz = attr.topico;
                scope.encender = function(){
                    var socket = io.connect('http://localhost:3000');
                    var datos2 = '{id: '+scope.luz+' , estado: on}';
                    var mensaje = {
                        topic: 'ard1',
                        payload:{
                            comando: 'accion',
                            destino: 'iluminacion',
                            datos: datos2
                        }
                    };
                    socket.emit('controlador' , JSON.stringify(mensaje));
                };
                scope.apagar = function(){
                    var socket = io.connect('http://localhost:3000');
                    var datos2 = '{id: '+scope.luz+' , estado: off}';
                    var mensaje = {
                        topic: 'ard1',
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