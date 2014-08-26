'use strict';

// Dispositivos controller
angular.module('dispositivos').controller('DispositivosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Dispositivos',
	function($scope, $stateParams, $location, Authentication, Dispositivos ) {
		$scope.authentication = Authentication;
        $scope.urlView = 'modules/dispositivos/views/view-dispositivo.client.view.html';
        $scope.urlCreate = 'modules/dispositivos/views/create-dispositivo.client.view.html';
        $scope.urlList = 'modules/dispositivos/views/list-dispositivos.client.view.html';
        $scope.urlEdit = 'modules/dispositivos/views/edit-dispositivo.client.view.html';

		// Create new Dispositivo
		$scope.create = function() {
			// Create new Dispositivo object
			var dispositivo = new Dispositivos ({
				nombre: this.nombre,
                descripcion: this.descripcion
			});

			// Redirect after save
			dispositivo.$save(function(response) {
                var url= $scope.urlList;
                $scope.cambiarPagina(url);
				//$location.path('dispositivos/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.nombre = '';
			this.descripcion = '';
		};

		// Remove existing Dispositivo
		$scope.remove = function( dispositivo ) {
			if ( dispositivo ) { dispositivo.$remove();

				for (var i in $scope.dispositivos ) {
					if ($scope.dispositivos [i] === dispositivo ) {
						$scope.dispositivos.splice(i, 1);
					}
				}
			} else {
				$scope.dispositivo.$remove(function() {
					$scope.cambiarPagina($scope.urlList);
				});
			}
		};

		// Update existing Dispositivo
		$scope.update = function() {
			var dispositivo = $scope.dispositivo ;

			dispositivo.$update(function() {
				$location.path('dispositivos/' + dispositivo._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Dispositivos
		$scope.find = function() {
			$scope.dispositivos = Dispositivos.query();
		};

		// Find existing Dispositivo
		$scope.findOne = function() {
			$scope.dispositivo = Dispositivos.get({ 
				dispositivoId: $stateParams.dispositivoId
			});
		};
		// Find existing Dispositivo
		$scope.cargarUno = function() {
			$scope.dispositivo = Dispositivos.get({
				dispositivoId: $scope.idView
			});
		};
	}
]);