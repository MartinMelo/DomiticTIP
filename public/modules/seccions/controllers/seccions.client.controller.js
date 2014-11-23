'use strict';

// Seccions controller
angular.module('seccions').controller('SeccionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Seccions','$http','Widgets',
	function($scope, $stateParams, $location, Authentication, Seccions,$http ,Widgets) {
		$scope.authentication = Authentication;
        $scope.urlList = 'modules/seccions/views/list-seccions.client.view.html';
        $scope.urlCreate = 'modules/seccions/views/create-seccion.client.view.html';
        $scope.urlView = 'modules/seccions/views/view-seccion.client.view.html';
        $scope.urlEdit = 'modules/seccions/views/edit-seccion.client.view.html';

		// Create new Seccion
		$scope.create = function() {
			// Create new Seccion object
			var seccion = new Seccions ({
                nombre: this.nombre,
                descripcion: this.descripcion
			});

			// Redirect after save
			seccion.$save(function(response) {
                $scope.cambiarPagina($scope.urlList);
				//$location.path('seccions/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.nombre = '';
			this.descripcion = '';
		};

		// Remove existing Seccion
		$scope.remove = function( seccion ) {
            new Seccions($scope.seccion).$remove(function() {
                $scope.cambiarPagina($scope.urlList);
            });

		};

		// Update existing Seccion
		$scope.update = function() {
			var seccion = new Seccions($scope.seccion);
			seccion.$update(function() {
                $scope.cambiarPagina($scope.urlList);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Seccions
		$scope.find = function() {
            var querySecciones = '{"user": "'+ $scope.authentication.user._id+'"}';
            $http.get('/seccions/query/' + querySecciones).success(function(data){
                $scope.seccions= data;
            });
		};

		// Find existing Seccion
		$scope.findOne = function() {
			$scope.seccion = Seccions.get({
				seccionId: $stateParams.seccionId
			});
		};
		// Find existing Seccion
		$scope.cargarUna = function() {
            $http.get('/seccions/'+$scope.idView).success(function(data){
                $scope.seccion= data;
                $scope.nombreAnterior = data.nombre;
            });

		};
	}
]);