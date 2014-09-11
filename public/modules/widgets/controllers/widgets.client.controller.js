'use strict';

// Widgets controller
var app = angular.module('widgets');
app.controller('WidgetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Widgets','$http',
	function($scope, $stateParams, $location, Authentication, Widgets) {
		$scope.authentication = Authentication;
        $scope.urlList = 'modules/widgets/views/list-widgets.client.view.html';
        $scope.urlView = 'modules/widgets/views/view-widget.client.view.html';
        $scope.urlEdit = 'modules/widgets/views/edit-widget.client.view.html';



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
	}
]);
app.controller('WidgetsInicioController',function ($scope, $interval, $http) {
    var widgetDefinitions = [
        {
            name: 'Hora',
            directive: 'wt-time',
            style: {
                width: '32%'
            }
        },
        {
            name: 'Numero Random',
            directive: 'wt-random',
            style: {
                width: '32%'
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
                width: '32%'
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

