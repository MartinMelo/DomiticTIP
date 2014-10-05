'use strict';

// Widgets controller
var app = angular.module('widgets');
app.controller('WidgetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Widgets','$http',
	function($scope, $stateParams, $location, Authentication, Widgets, $http) {
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
            var user  = $scope.authentication.user._id;
            $http.get('/widgets/usuario/'+ user).success(function(data){
                $scope.widgets = data;
            });
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
    /**
     * La definicion de los widgets por defecto.
     * Esta cambia cuando se cargan de la base de datos.
     * @type {*[]}
     */
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
                controlador: 'ard#'
            },
            style: {
                width: '32%'
            }
        },
        {
            name: 'Apertura',
            directive: 'widget-apertura',
            attrs: {
                value: 'sensor',
                topico: 'topico',
                controlador: 'ard#'
            },
            style: {
                width: '32%'
            }
        },
        {
            name: 'Iluminacion',
            directive: 'widget-iluminacion',
            attrs: {
                value: 'sensor',
                topico: 'topico',
                controlador: 'ard#'
            },
            style: {
                width: '32%'
            }
        }
    ];
    var defaultWidgets = [];

    /**
     * Opciones del dashboard
     * @type {{widgetButtons: boolean, widgetDefinitions: *[], defaultWidgets: Array, hideWidgetClose: boolean, hideWidgetSettings: boolean}}
     */
    $scope.dashboardOptions = {
        widgetButtons: true,
        widgetDefinitions: widgetDefinitions,
        defaultWidgets: defaultWidgets,
        hideWidgetClose: true,
        hideWidgetSettings: true
    };
    /**
     * Cargo la lista de secciones
     */
    $scope.secciones = [];
    var querySecciones = '{"user": "'+ $scope.authentication.user._id+'"}';
    $http.get('/seccions/query/' + querySecciones).success(function(data){
        $scope.seccion= data[0].nombre;
        $scope.secciones= data;
        $scope.cambiarSeccion(data[0].nombre);
    });
    /**
     * Carga los widgets de la seccion seleccionada.
     * @param seccion
     */
    $scope.cambiarSeccion = function(seccion){
        $scope.seccion = seccion;
        var parametros = '{"seccion":"'+ seccion +'", "user": "'+ $scope.authentication.user._id+'"}';
        $http.get('/widgets/query/' + parametros).success(function(data){
           $scope.dashboardOptions.widgetDefinitions = data ;
           $scope.dashboardOptions.loadWidgets(data);
        });
    };
    this.isSelected = function(nombre){
        return $scope.seccion === nombre;
    };

});

