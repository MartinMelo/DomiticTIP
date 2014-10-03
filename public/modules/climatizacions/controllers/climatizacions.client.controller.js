'use strict';

// Climatizacions controller
angular.module('climatizacions').controller('ClimatizacionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Climatizacions',
	function($scope, $stateParams, $location, Authentication, Climatizacions ) {
        $scope.urlList = 'modules/climatizacions/views/list-climatizacions.client.view.html';
        $scope.urlView = 'modules/climatizacions/views/view-climatizacion.client.view.html';
        $scope.urlCreate = 'modules/climatizacions/views/create-climatizacion.client.view.html';
        $scope.urlEdit = 'modules/climatizacions/views/edit-climatizacion.client.view.html';
		$scope.authentication = Authentication;

		// Create new Climatizacion
		$scope.create = function() {
			// Create new Climatizacion object
			var climatizacion = new Climatizacions ({
                nombre: this.nombre,
                temperatura: this.temperatura
			});

			// Redirect after save
			climatizacion.$save(function(response) {
                $scope.cambiarPagina($scope.urlList);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.nombre = '';
			this.temperatura = '';
		};

		// Remove existing Climatizacion
		$scope.remove = function( climatizacion ) {
			if ( climatizacion ) { climatizacion.$remove();

				for (var i in $scope.climatizacions ) {
					if ($scope.climatizacions [i] === climatizacion ) {
						$scope.climatizacions.splice(i, 1);
					}
				}
			} else {
				$scope.climatizacion.$remove(function() {
                    $scope.cambiarPagina($scope.urlList);
				});
			}
		};

		// Update existing Climatizacion
		$scope.update = function() {
			var climatizacion = $scope.climatizacion ;

			climatizacion.$update(function() {
                $scope.cambiarPagina($scope.urlList);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Climatizacions
		$scope.find = function() {
			$scope.climatizacions = Climatizacions.query();
		};

		// Find existing Climatizacion
		$scope.findOne = function() {
			$scope.climatizacion = Climatizacions.get({ 
				climatizacionId: $stateParams.climatizacionId
			});
		};

		$scope.cargarUno = function() {
			$scope.climatizacion = Climatizacions.get({
				climatizacionId: $scope.idView
			});
		};
	}
]);