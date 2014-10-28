/**
 * Created by Martin Alejandro Melo
 * Fecha 16/10/2014.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    mongoose = require('mongoose');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db);
var Schema = mongoose.Schema;
/**
 * Tarea Schema
 */
var TareaSchema = new Schema({
    nombre: {
        type: String,
        default: '',
        required: 'Por favor ingresa un nombre para la tarea automatica.',
        trim: true
    },
    datos: {
        tipo:{
            type: String,
            default: '',
            required: 'Por favor ingresa el tipo de la tarea automatica.',
            trim: true
        },
        repetir:{
            type: Boolean,
            default: false,
            required: 'No se ingreso si se desea repetir la tarea'
        },
        calendario:{
            type: Object,
            default: {},
            required: 'No se generaron los datos de la tarea.',
            trim: false
        },
        informacion:{
            type: Object,
            default: {},
            required: 'No se generaron los datos de la tarea.',
            trim: false
        },
        topico:{
            type: Object,
            default: {},
            required: 'No se generaron los datos de la tarea.',
            trim: false
        },
        controlador:{
            type: Object,
            default: {},
            required: 'No se generaron los datos de la tarea.',
            trim: false
        }
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Tarea', TareaSchema);

var socket = require('socket.io-client')('http://localhost:3000');
var schedule = require('node-schedule');

function cargarTareasQueEstanEnDB(){
    console.info('Cargando Tareas Guardadas en DB');

    console.info('Todas las tareas se cargaron');
}

cargarTareasQueEstanEnDB();
/*
*Es la lista donde van a estar las tareas que se ponen a correr cada vez que
* se ejecute el servidor o cada vez que se cree una tarea nueva.
 * De modo que se puedan cancelar mas facil.
*/
var tareasACorrer = [];
socket.emit('subscribe', {topic : 'schedulear'});
socket.on('schedulear', function (data) {
    crearTask(data.payload);
    console.log('Task Created');
});
function crearTask(json){
    var repetir = json.datos.repetir;
    var fecha = json.datos.calendario;

    var j = schedule.scheduleJob(fecha, function(){
        var topico = json.datos.controlador;
        var luz = json.datos.topico;
        var estado = json.datos.informacion;
        console.log('Ejecutando Tarea: ' + json.nombre);
        console.log(json.datos);
        accionesLuces(luz, estado,topico);
        console.log('Tarea Finalizada: ' + json.nombre);
    });
}

function accionesLuces(numero, estado, topico){
    var cambiar= 'off';
    if(estado === 'Encender'){
        cambiar= 'on';
    }
    var datos2 = '{id: '+numero+' , estado: '+cambiar+'}';
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
