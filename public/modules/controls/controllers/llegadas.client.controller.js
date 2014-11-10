'use strict';

angular.module('controls').controller('LlegadasController', ['$scope','$http',
	function($scope, $http) {


        $scope.fecha = Date.now();
        $http.get('/controls/llegadas').success(function(data){
            $scope.llegadas = data;
        });
	}
]);