'use strict';

angular.module('widgets').controller('EditarWidgetController', ['$scope', '$http', 'Widgets',
	function($scope, $http, Widgets) {

        // Update existing Widget
        $scope.update = function() {
            var widget = $scope.widget ;

            widget.$update(function() {
                $scope.idView = widget._id;
                $scope.cambiarPagina($scope.urlView);
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
        $http.get('/seccions').success(function(data){
            $scope.seccion = data[0];
            $scope.secciones = data;
        });
        $scope.dispositivos = [];
        $http.get('/dispositivos').success(function(data){
            $scope.dispositivo = data[0];
            $scope.dispositivos = data;
        });
	}
]);