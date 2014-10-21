/**
 * Created by Martin Alejandro Melo
 * Fecha 16/10/2014.
 */

var socket = require('socket.io-client')('http://localhost:3000');
var schedule = require('node-schedule');

/*
*Es la lista donde van a estar las tareas que se ponen a correr cada vez que
* se ejecute el servidor o cada vez que se cree una tarea nueva.
 * De modo que se puedan cancelar mas facil.
*/
var tareasACorrer = [];
socket.on('schedulear', function (data) {
    crearTask(data.payload);
});
function crearTask(json){
    var repetir = json.datos.repetir;
    var fecha = json.datos.calendario;
    var anio = fecha.substring(0, 4);
    var mes = fecha.substring(5, 7);
    var dia = fecha.substring(8, 10);
    var hora= 22;
    var minutos= 00;

    var rule = new schedule.RecurrenceRule();
    rule.year = anio;
    rule.month = mes;
    rule.date = dia;
    rule.hour = hora;
    rule.minute = minutos;
    console.log(rule);
    var j = schedule.scheduleJob(rule, function(){
        console.log('Scheduled Task Running');
        //ccionesLuces(luz, estado,topico);
    });
}

function accionesLuces(numero, estado, topico){
    var datos2 = '{id: '+numero+' , estado: '+estado+'}';
    var mensaje = {
        topic: topico,
        payload:{
            comando: 'accion',
            destino: 'iluminacion',
            datos: datos2
        }
    };
    socket.emit('controlador' , JSON.stringify(mensaje));
}
