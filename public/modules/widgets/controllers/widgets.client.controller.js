'use strict';

// Widgets controller
var app = angular.module('widgets');
app.controller('WidgetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Widgets','$http',
	function($scope, $stateParams, $location, Authentication, Widgets, $http ) {
		$scope.authentication = Authentication;
        $scope.urlList = 'modules/widgets/views/list-widgets.client.view.html';
        $scope.urlView = 'modules/widgets/views/view-widget.client.view.html';
        $scope.urlEdit = 'modules/widgets/views/edit-widget.client.view.html';

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
				//$location.path('widgets/' + response._id);
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

		// Remove existing Widget
		$scope.remove = function( widget ) {
			if ( widget ) { widget.$remove();

				for (var i in $scope.widgets ) {
					if ($scope.widgets [i] === widget ) {
						$scope.widgets.splice(i, 1);
					}
				}
			} else {
				$scope.widget.$remove(function() {
                    $scope.cambiarPagina($scope.urlList);
				});
			}
		};

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

		// Find a list of Widgets
		$scope.find = function() {
			$scope.widgets = Widgets.query();
		};

		// Find existing Widget
		$scope.findOne = function() {
			$scope.widget = Widgets.get({ 
				widgetId: $stateParams.widgetId
			});
		};
        //Cargar Widget Por ID
        $scope.cargarUno = function() {
            $scope.widget = Widgets.get({
                widgetId: $scope.idView
            });
        };


        //Creacion de un widgets
        $scope.topico = 'ard1/living/temp';
        $scope.idinfo = 'idloco';
        this.tipos = ['Hora', 'Temperatura', 'Sensor'];
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
app.controller('WidgetsInicioController',function ($scope, $interval, $http) {
    var widgetDefinitions = [
        {
            name: 'Hora',
            directive: 'wt-time',
            style: {
                width: '33%'
            }
        },
        {
            name: 'Numero Random',
            directive: 'wt-random',
            style: {
                width: '33%'
            }
        },
        {
            name: 'Temperatura',
            directive: 'widget-temperatura',
            attrs: {
                value: 'temperatura',
                topico: 'topico',
                idinfo: 'tempId',
                controlador: 'ard#'
            },
            style: {
                width: '34%'
            }
        }
    ];
    $http.get('/widgets/seccion/inicio').success(function(data){
        $scope.dashboardOptions.widgetDefinitions =data ;
        $scope.dashboardOptions.loadWidgets(data);
    });
    var defaultWidgets = [];

    $scope.dashboardOptions = {
        widgetButtons: true,
        widgetDefinitions: widgetDefinitions,
        defaultWidgets: defaultWidgets,
        hideWidgetClose: true,
        hideWidgetSettings: true
    };
});

