'use strict';

// Widgets controller
var app = angular.module('widgets');
app.controller('WidgetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Widgets',
	function($scope, $stateParams, $location, Authentication, Widgets ) {
		$scope.authentication = Authentication;
        $scope.urlList = 'modules/widgets/views/list-widgets.client.view.html';
        $scope.urlView = 'modules/widgets/views/view-widget.client.view.html';
        $scope.urlEdit = 'modules/widgets/views/edit-widget.client.view.html';
        this.tipos = ['Hora', 'Temperatura', 'Sensor'];
		// Create new Widget
		$scope.create = function() {
			// Create new Widget object
			var widget = new Widgets ({
				name: this.name,
				title: this.title,
				seccion: this.seccion
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
            console.log($scope.idView);
            $scope.widget = Widgets.get({
                widgetId: $scope.idView
            });
        };
	}
]);
app.controller('WidgetsInicioController',function ($scope, $interval, $http, RandomTopNDataModel, RandomTimeSeriesDataModel,
                                             RandomMinutesDataModel, RandomNVD3TimeSeriesDataModel) {
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
            directive: 'wt-scope-watch',
            attrs: {
                value: 'temperatura'
            },
            style: {
                width: '34%'
            }
        },
        {
            name: 'scope-watch',
            directive: 'wt-scope-watch',
            attrs: {
                value: 'randomValue'
            },
            style: {
                width: '34%'
            }
        },
        {
            name: 'Line Chart',
            directive: 'wt-line-chart',
            dataAttrName: 'chart',
            dataModelType: RandomTimeSeriesDataModel,
            style: {
                width: '50%'
            }
        },
        {
            name: 'NVD3 Line Chart',
            directive: 'wt-nvd3-line-chart',
            dataAttrName: 'data',
            dataModelType: RandomNVD3TimeSeriesDataModel,
            dataModelArgs: {
                rate: 40
            },
            style: {
                width: '50%'
            }
        },
        {
            name: 'Bar Chart',
            directive: 'wt-bar-chart',
            dataAttrName: 'data',
            dataModelType: RandomMinutesDataModel,
            dataModelArgs: {
                limit: 1000
            },
            style: {
                width: '50%'
            }
        },
        {
            name: 'topN',
            directive: 'wt-top-n',
            dataAttrName: 'data',
            dataModelType: RandomTopNDataModel
        },
        {
            name: 'gauge',
            directive: 'wt-gauge',
            attrs: {
                value: 'percentage'
            },
            style: {
                width: '250px'
            }
        }
    ];
    $http.get('/widgets/seccion/inicio').success(function(data){
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

    // random scope value (scope-watch widget)
    $interval(function () {
        $scope.randomValue = Math.random();
    }, 500);

    // percentage (gauge widget, progressbar widget)
    $scope.percentage = 5;
    $interval(function () {
        $scope.percentage = ($scope.percentage + 10) % 100;
    }, 1000);

    // line chart widget
    $interval(function () {
        $scope.topN = _.map(_.range(0, 10), function (index) {
            return {
                name: 'item' + index,
                value: Math.floor(Math.random() * 100)
            };
        });
    }, 500);
});

