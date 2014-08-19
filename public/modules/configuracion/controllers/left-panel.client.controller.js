'use strict';

angular.module('configuracion').controller('LeftPanelController', ['$scope',
	function($scope) {
        this.expandirPanel = function(nombreUL){
            $scope.colapsarMenuAbierto();
            $scope.expandirMenuSeleccionado(nombreUL);
            $scope.cambiarIconos(nombreUL);
        };
        $scope.colapsarMenuAbierto = function(){
            $('.expandido').attr('class' , 'menu-child nav nav-pills nav-stacked colapsado');
        };
        $scope.expandirMenuSeleccionado = function(nombreUL){
            $('#'+nombreUL).attr('class' , 'menu-child nav nav-pills nav-stacked expandido');
        };
        $scope.cambiarIconos = function(nombreUL){
            $('.fa-minus-square-o').attr('class' , 'fa fa-plus-square-o collapse-sign');
            $('#' +nombreUL + "-b").attr('class' , 'fa fa-minus-square-o collapse-sign');
        };
	}
]);