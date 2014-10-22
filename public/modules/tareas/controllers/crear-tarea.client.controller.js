'use strict';

angular.module('tareas').controller('CrearTareaController', ['$scope', 'Authentication', 'Tareas','ENV','$http',
	function($scope, Authentication, Tareas, ENV , $http) {
        $scope.authentication = Authentication;
        $scope.urlList = 'modules/tareas/views/list-tareas.client.view.html';

        ////////////////Datos para completar el formulario/////////////////////////////////////

        //Seleccion de dia para tarea individual
        $scope.dia = 'Lunes';
        $scope.dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
        //tipos de tareas automaticas
        $scope.tipo = 'Seleccione un tipo de tarea';
        $scope.tipos = ['Seleccione un tipo de tarea','Iluminacion'];
        //configuracion del calendario
        $scope.mindate = Date.now();
        $scope.hora= 12;
        $scope.minutos= 0;


        //Agrego los tipos de acciones segun el tipo seleccionado.
        $scope.accion = 'Seleccione una accion';
        $scope.acciones=['Seleccione una accion'];
        $scope.cargarAcciones = function(){
            if($scope.tipo === 'Iluminacion'){
                $scope.acciones = ['Encender', 'Apagar'];
                $scope.accion = $scope.acciones[0];
                $scope.iluminacionSelect();
            }
        };

        //Agrego los dispositivos
        $scope.dispositivos = [];
        $http.get('/dispositivos').success(function(data){
            $scope.dispositivo = data[0];
            $scope.dispositivos = data;
        });

        //Pedir servicios para el tipo de Widget seleccionado.
        $scope.topicos= [{'nombre': 'seleccione un Sensor' , 'topico': 'untopico'}];
        $scope.iluminacionSelect = function(){
            $('#topico').empty();
            $scope.pedirExponerServiciosDe('luz');
        };
        $scope.temperaturaSelect = function(){
            $('#topico').empty();
            $scope.pedirExponerServiciosDe('sensor');
        };
        $scope.aperturaSelect = function(){
            $('#topico').empty();
            $scope.pedirExponerServiciosDe('sensor');
        };
        var ip = ENV.server + ':3000';
        var socket = io.connect(ip);
        socket.emit('subscribe', {topic : 'resp/discover'});
        socket.on('resp/discover', function (msg) {
            $scope.agregarALista(msg);
        });
        $scope.agregarALista = function(msg){
            var json = JSON.parse(msg.payload);
            $('#topico').append(new Option('Seleccione Un Sensor', 'Seleccione Un Sensor'));
            if(json.sensor === undefined){
                var luces = json.luz;
                for(var i in luces){
                    $('#topico').append(new Option(luces[i].nombre, luces[i].topico));
                }
                this.topico =luces[0].topico;
            }else {
                var sensores = json.sensor;
                for(var i in sensores){
                    if((sensores[i].tipo === 'numero') && (this.name  ==='Temperatura')){
                        $('#topico').append(new Option(sensores[i].nombre, sensores[i].topico));
                    }
                    if((sensores[i].tipo === 'bool') && (this.name  ==='Apertura')){
                        $('#topico').append(new Option(sensores[i].nombre, sensores[i].topico));
                    }
                }
            }
            $('#sens').removeClass('fa fa-refresh fa-lg fa-spin');
        };
        $scope.pedirExponerServiciosDe = function(tipo){
            var ip = ENV.server + ':3000';
            var socket = io.connect(ip);
            var topico = $scope.dispositivo.controlador+ '/discover';
            var mensaje = {
                topic: topico,
                payload:{
                    comando: 'exponerServicios',
                    servicio: tipo
                }
            };
            socket.emit('controlador', JSON.stringify(mensaje));
        };
        //FIN de Pedir servicios para el tipo de Widget seleccionado.


        //Crea una nueva tarea.
        $scope.create = function() {
            var fechaSeleccionada = $scope.fecha;
            fechaSeleccionada.setHours($scope.hora);
            fechaSeleccionada.setMinutes($scope.minutos);
            //Creo la tarea y la guardo.
            var tarea = new Tareas ({
                nombre: this.nombre,
                datos: {
                    tipo: this.tipo,
                    repetir: this.repetir,
                    calendario: fechaSeleccionada,
                    informacion: this.accion,
                    topico: this.topico,
                    controlador: this.dispositivo.controlador
                }
            });

            // Redirect after save
            tarea.$save(function(response) {
                $scope.publicarTarea(tarea);
                $scope.cambiarPagina($scope.urlList);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            // Clear form fields
            this.nombre = '';
            this.datos = {};
            this.tipo ='';
            this.repetir = '';
            this.calendario= {};
            this.informacion= {};
        };

        //Publico la tarea para que el servicio que corre las tareas se haga cargo
        $scope.publicarTarea = function(tarea){
            var ip = ENV.server + ':3000';
            var socket = io.connect(ip);
            var mensaje = {
                topic: 'nuevaTarea',
                payload: tarea
            };
            socket.emit('schedulear' , JSON.stringify(mensaje));
        };
	}
]);