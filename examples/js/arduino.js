/**
 * Created by Martin Melo on 19/07/2014.
 */
function encenderLuz(){
    var numero = window.document.getElementById('numero').value;
    var socket = io.connect('http://localhost:3000');
    var datos2 = '{id: '+numero+' , estado: on}';
    var mensaje = {
        topic: 'arduino',
        payload:{
            comando: 'accion',
            destino: 'iluminacion',
            datos: datos2
        }
    };
    socket.emit('controlador' , JSON.stringify(mensaje));
}
function apagarLuz(){
    var numero = window.document.getElementById('numero').value;
    var socket = io.connect('http://localhost:3000');
    var datos2 = '{id: '+numero+' , estado: off}';
    var mensaje = {
        topic: 'arduino',
        payload:{
            comando: 'accion',
            destino: 'iluminacion',
            datos: datos2
        }
    };
    socket.emit('controlador' , JSON.stringify(mensaje));
}
function actualizarPuerta(puerta){
    var socket = io.connect('http://localhost:3000');
    var topico = 'arduino';
    var datos = '{id: puertas , posicion: '+ puerta +'}';
    var mensaje = {
        topic: topico,
        payload:{
            comando: 'accion',
            destino: 'sensores',
            datos: datos
        }
    };
    socket.emit('controlador' , JSON.stringify(mensaje));
}
function actualizarTemperatura(posicion){
    var socket = io.connect('http://localhost:3000');
    var topico = 'arduino';
    var datos = '{id: temperatura , posicion: '+ posicion +'}';
    var mensaje = {
        topic: topico,
        payload:{
            comando: 'accion',
            destino: 'sensores',
            datos: datos
        }
    };
    socket.emit('controlador' , JSON.stringify(mensaje));
}
function actualizarTodo(){
    var socket = io.connect('http://localhost:3000');
    var topico = 'arduino';
    var mensaje = {
        topic: topico,
        payload:{
            comando: 'actualizar'
        }
    };
    socket.emit('controlador' , JSON.stringify(mensaje));
}