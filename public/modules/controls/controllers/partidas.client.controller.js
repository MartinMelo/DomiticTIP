'use strict';

angular.module('controls').controller('PartidasController', ['$scope','$http',
	function($scope, $http) {

        $http.get('/controls/partidas').success(function(data){
            $scope.partidas = data;
        });
	}
]);