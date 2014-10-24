'use strict';

var app = angular.module('configuracion');
app.controller('ConfiguracionController', ['$scope',
	function($scope) {
        $scope.pagina = 'modules/configuracion/views/informacion.client.view.html';
        this.menus = [
            {
                nombre: 'Tareas Automaticas',
                i: 'fa fa-calendar fa-2x',
                colapseID:'Tareas-Automaticas-Child',
                links: [
                    {
                        url: 'modules/tareas/views/list-tareas.client.view.html',
                        span: 'Disponibles'
                    },
                    {
                        url: 'modules/tareas/views/create-tarea.client.view.html',
                        span: 'Agregar'
                    }
                ]
            },
            {
                nombre: 'Climatización',
                i: 'fa fa-sun-o fa-2x',
                colapseID:'Climatizacion-Child',
                links: [
                    {
                        url: 'modules/climatizacions/views/list-climatizacions.client.view.html',
                        span: 'Disponibles'
                    },
                    {
                        url: 'modules/climatizacions/views/create-climatizacion.client.view.html',
                        span: 'Agregar'
                    }
                ]
            },
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
        $scope.cargarInformacion = function(){
            $scope.colapsarMenuAbierto();
            $scope.cambiarPagina('modules/configuracion/views/informacion.client.view.html');
        };
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
            $('.fa-minus-square-o').attr('class' , 'fa fa-plus-square-o collapse-sign enGris');
        };
        $scope.expandirMenuSeleccionado = function(nombreUL){
            $('#'+nombreUL).attr('class' , 'menu-child nav nav-pills nav-stacked expandido');
        };
        $scope.cambiarIconos = function(nombreUL){
            $('#' +nombreUL + '-b').attr('class' , 'fa fa-minus-square-o collapse-sign enGris');
        };
        $scope.cargar = function(url, id){
            $scope.idView = id;
            $scope.cambiarPagina(url);
        };
        $scope.editar = function(url){
            $scope.cambiarPagina(url);
        };
	}
]);
