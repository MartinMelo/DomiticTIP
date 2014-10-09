'use strict';

angular.module('controls').controller('LlegadasController', ['$scope','$http',
	function($scope, $http) {



        $http.get('/controls/llegadas').success(function(data){
            $scope.llegadas = data;
        });
	}
]);