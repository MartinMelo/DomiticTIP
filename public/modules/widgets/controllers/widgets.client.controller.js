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
app.controller('WidgetsInicioController',function ($scope, $interval, $http,$rootScope) {


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
                nombre: 'nombre',
                topico: 'topico',
                controlador: 'ard#',
                dispositivo: {}
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
                nombre: 'nombre',
                topico: 'topico',
                controlador: 'ard#',
                dispositivo: {}
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
                nombre: 'nombre',
                topico: 'topico',
                controlador: 'ard#',
                dispositivo: {}
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

    //La inicio vacia.
    $scope.secciones = [];

    /**
     * Carga el Dashboard del usuario.
     */
    $scope.cargarDashBoard = function(){
      if(!$scope.noEstaLogueado){
          $scope.cargarSecciones();
      }
    };
    /**
     * Cargo la lista de secciones
     */
    $scope.cargarSecciones = function(){
        var querySecciones = '{"user": "'+ $scope.authentication.user._id+'"}';
        $http.get('/seccions/query/' + querySecciones).success(function(data) {
            if (data.length >0) {
                $scope.noHaySecciones = false;
                $scope.seccion = data[0]._id;
                $scope.secciones = data;
                $scope.cambiarSeccion(data[0]._id);
            }else{
                $scope.noHaySecciones = true;
            }
        });
    };


    /**
     * Carga los widgets de la seccion seleccionada.
     * @param seccion
     */
    $scope.cambiarSeccion = function(seccion){
        $rootScope.socket.removeAllListeners();
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

