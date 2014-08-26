'use strict';

var app = angular.module('configuracion');
app.controller('ConfiguracionController', ['$scope',
	function($scope) {
        $scope.pagina = 'modules/widgets/views/list-widgets.client.view.html';
        this.menus = [
            {
                nombre: 'Dispositivos',
                i: 'fa fa-upload fa-2x',
                colapseID:'Dispositivos-Child',
                links: [
                    {
                        url: 'modules/dispositivos/views/list-dispositivos.client.view.html',
                        span: 'Disponibles'
                    },
                    {
                        url: 'modules/dispositivos/views/create-dispositivo.client.view.html',
                        span: 'Agregar'
                    }
                ]
            },
            {
                nombre: 'Widgets',
                i: 'fa fa-tasks fa-2x',
                colapseID:'Widgets-Child',
                links: [
                    {
                        url: 'modules/widgets/views/list-widgets.client.view.html',
                        span: 'Disponibles'
                    },
                    {
                        url: 'modules/widgets/views/create-widget.client.view.html',
                        span: 'Agregar'
                    }
                ]

            },
            {
                nombre: 'Secciones',
                i: 'fa fa-sitemap fa-2x',
                colapseID:'Secciones-Child',
                links: [
                    {
                        url: 'modules/seccions/views/list-seccions.client.view.html',
                        span: 'Disponibles'
                    },
                    {
                        url: 'modules/seccions/views/create-seccion.client.view.html',
                        span: 'Agregar'
                    }
                ]
            }
        ];
        $scope.cambiarPagina = function(url){
            $scope.pagina = url;
        };
        this.expandirPanel = function(nombreUL){
            $scope.colapsarMenuAbierto();
            $scope.expandirMenuSeleccionado(nombreUL);
            $scope.cambiarIconos(nombreUL);
        };
        $scope.colapsarMenuAbierto = function(){
            $('.expandido').attr('class' , 'menu-child nav nav-pills nav-stacked colapsado');
            $('.fa-minus-square-o').attr('class' , 'fa fa-plus-square-o collapse-sign');
        };
        $scope.expandirMenuSeleccionado = function(nombreUL){
            $('#'+nombreUL).attr('class' , 'menu-child nav nav-pills nav-stacked expandido');
        };
        $scope.cambiarIconos = function(nombreUL){
            $('#' +nombreUL + '-b').attr('class' , 'fa fa-minus-square-o collapse-sign');
        };
        $scope.cargar = function(url, id){
            $scope.idView = id;
            $scope.cambiarPagina(url);
        };
	}
]);
