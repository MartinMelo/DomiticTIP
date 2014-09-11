'use strict';

angular.module('widgets').controller('CrearWidgetController', ['$scope', '$http', 'Widgets',
	function($scope, $http, Widgets) {
        $scope.urlList = 'modules/widgets/views/list-widgets.client.view.html';

        // Create new Widget
        $scope.create = function() {
            // Create new Widget object
            var widget = new Widgets ({
                name: this.name,
                title: this.title,
                seccion: this.seccion.nombre,
                attrs:{
                    value: this.title,
                    topico: this.topico,
                    idinfo: this.idinfo,
                    controlador: this.dispositivo.controlador
                }

            });

            // Redirect after save
            widget.$save(function(response) {
                $scope.cambiarPagina($scope.urlList);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            // Clear form fields
            this.name = '';
            this.title = '';
            this.seccion = '';
            this.attrs= '';
            this.dispositivo= '';
        };

        //Creacion de un widgets
        $scope.topico = 'ard1/living/temp';
        $scope.idinfo = 'idloco';
        this.tipos = ['Hora', 'Temperatura', 'Sensor', 'Apertura'];
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