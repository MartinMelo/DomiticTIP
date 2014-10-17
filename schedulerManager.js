/**
 * Created by Martin Alejandro Melo
 * Fecha 16/10/2014.
 */

var socket = require('socket.io-client')('http://localhost:3000');
var schedule = require('node-schedule');

socket.on('schedulear', function (data) {
    var json = data.payload;
    console.log(json);
    crearTask(json);
});
function crearTask(json){
    var rule = new schedule.RecurrenceRule();
    rule.minute = json.minuto;
    //rule.hour = json.dia;
    var luz = json.luz;
    var estado = json.estado;
    var topico = json.topico;

    var j = schedule.scheduleJob(rule, function(){
        console.log('Scheduled Task Running');
        accionesLuces(luz, estado,topico);
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
