'use strict';

var app = angular.module('configuracion');
app.controller('ConfiguracionController', ['$scope',
	function($scope) {
		// Controller Logic
		// ...
	}
]);
app.controller('ConfigController', function ($scope, $interval, RandomTopNDataModel, RandomTimeSeriesDataModel,
                                     RandomMinutesDataModel, RandomNVD3TimeSeriesDataModel) {
    var widgetDefinitions = [
        {
            name: 'time',
            directive: 'wt-time',
            style: {
                width: '33%'
            }
        },
        {
            name: 'random',
            directive: 'wt-random',
            style: {
                width: '33%'
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

    var defaultWidgets = [
        { name: 'time' },
        { name: 'random' },
        { name: 'scope-watch' },
        { name: 'Line Chart' },
        { name: 'NVD3 Line Chart' },
        { name: 'Bar Chart' },
        { name: 'topN' },
        { name: 'gauge' }
    ];

    $scope.dashboardOptions = {
        widgetButtons: true,
        widgetDefinitions: widgetDefinitions,
        defaultWidgets: defaultWidgets
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

