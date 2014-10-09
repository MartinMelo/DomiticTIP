'use strict';

angular.module('controls').controller('PartidasController', ['$scope','$http',
	function($scope, $http) {



        $http.get('/control/partidas').success(function(data){
            $scope.partidas = data;
        });
	}
]);