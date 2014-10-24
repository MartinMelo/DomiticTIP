'use strict';

// Dispositivos controller
angular.module('dispositivos').controller('DispositivosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Dispositivos','ENV',
	function($scope, $stateParams, $location, Authentication, Dispositivos, ENV ) {
		$scope.authentication = Authentication;
        $scope.urlView = 'modules/dispositivos/views/view-dispositivo.client.view.html';
        $scope.urlCreate = 'modules/dispositivos/views/create-dispositivo.client.view.html';
        $scope.urlList = 'modules/dispositivos/views/list-dispositivos.client.view.html';
        $scope.urlEdit = 'modules/dispositivos/views/edit-dispositivo.client.view.html';

		// Create new Dispositivo
		$scope.create = function() {
			// Create new Dispositivo object
			var dispositivo = new Dispositivos ({
				nombre: this.nombre,
                descripcion: this.descripcion,
                controlador: this.controlador
			});

			// Redirect after save
			dispositivo.$save(function(response) {
                var ip = ENV.server + ':3000';
                io.connect(ip).removeAllListeners('resp/discover');
                var url= $scope.urlList;
                $scope.cambiarPagina(url);
				//$location.path('dispositivos/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.nombre = '';
			this.descripcion = '';
			this.controlador = '';
		};

		// Remove existing Dispositivo
		$scope.remove = function( dispositivo ) {
			if ( dispositivo ) { dispositivo.$remove();

				for (var i in $scope.dispositivos ) {
					if ($scope.dispositivos [i] === dispositivo ) {
						$scope.dispositivos.splice(i, 1);
					}
				}
			} else {
				$scope.dispositivo.$remove(function() {
					$scope.cambiarPagina($scope.urlList);
				});
			}
		};

		// Update existing Dispositivo
		$scope.update = function() {
			var dispositivo = $scope.dispositivo ;
            dispositivo.controlador = $scope.controlador;
			dispositivo.$update(function() {
                $scope.cambiarPagina($scope.urlList);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Dispositivos
		$scope.find = function() {
			$scope.dispositivos = Dispositivos.query();
		};

		// Find existing Dispositivo
		$scope.findOne = function() {
			$scope.dispositivo = Dispositivos.get({ 
				dispositivoId: $stateParams.dispositivoId
			});
		};
		// Find existing Dispositivo
		$scope.cargarUno = function() {
			$scope.dispositivo = Dispositivos.get({
				dispositivoId: $scope.idView
			});
		};


        $scope.controladores = [];
        $scope.controlador = 'Seleccione Un Controlador';
        var ip = ENV.server + ':3000';
        var socket = io.connect(ip);
        socket.emit('subscribe', {topic : 'resp/discover'});
        socket.on('resp/discover', function (msg) {
            $scope.agregarALista(msg);
        });
        $scope.buscarDispositivos = function(){
            $scope.pedirExponerServicios();
        };
        $scope.agregarALista = function(msg){
            var json = JSON.parse(msg.payload);
            $scope.controladores[$scope.controladores.length] =json.suscripto;
            $('#controlador').append(new Option(json.suscripto, json.suscripto));
            $('#controlador').effect("highlight", {color:"#ff0000"}, 500);
        };
        $scope.pedirExponerServicios = function(){
            var ip = ENV.server + ':3000';
            var socket = io.connect(ip);
            var topico = 'discover';
            var mensaje = {
                topic: topico,
                payload:{
                    comando: 'exponerServicios',
                    servicio: 'todo'
                }
            };
            socket.emit('controlador', JSON.stringify(mensaje));
        };
        $scope.$on("$destroy", function() {
            socket.removeAllListeners('resp/discover');
        });

	}
]);