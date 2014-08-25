'use strict';

// Seccions controller
angular.module('seccions').controller('SeccionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Seccions',
	function($scope, $stateParams, $location, Authentication, Seccions ) {
		$scope.authentication = Authentication;

		// Create new Seccion
		$scope.create = function() {
			// Create new Seccion object
			var seccion = new Seccions ({
				name: this.name
			});

			// Redirect after save
			seccion.$save(function(response) {
                var url= 'modules/seccions/views/list-seccions.client.view.html';
                $scope.cambiarPagina(url);
				//$location.path('seccions/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Seccion
		$scope.remove = function( seccion ) {
			if ( seccion ) { seccion.$remove();

				for (var i in $scope.seccions ) {
					if ($scope.seccions [i] === seccion ) {
						$scope.seccions.splice(i, 1);
					}
				}
			} else {
				$scope.seccion.$remove(function() {
					$location.path('seccions');
				});
			}
		};

		// Update existing Seccion
		$scope.update = function() {
			var seccion = $scope.seccion ;

			seccion.$update(function() {
				$location.path('seccions/' + seccion._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Seccions
		$scope.find = function() {
			$scope.seccions = Seccions.query();
		};

		// Find existing Seccion
		$scope.findOne = function() {
			$scope.seccion = Seccions.get({
				seccionId: $stateParams.seccionId
			});
		};
		// Find existing Seccion
		$scope.cargarUna = function() {
			$scope.seccion = Seccions.get({
				seccionId: $scope.seccionId
			});
		};
	}
]);