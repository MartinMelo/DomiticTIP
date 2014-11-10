/**
 * Created by Martin Alejandro Melo
 * Date: 12/10/2014.
 */

var socket = require('socket.io-client')('http://localhost:3000');

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
var SchemaControl = new Schema({
    tipo: {
        type: String,
        default: '',
        required: 'Por favor ingrese el tipo de control',
        trim: true
    },
    horario: {
        type: Date,
        default: Date.now
    },
    empleado: {
        type: Schema.ObjectId,
        ref: 'Empleado'
    }
});
var SchemaEmpleado = new Schema({
    nombre: {
        type: String,
        default: '',
        required: 'Por favor ingrese el nombre',
        trim: true
    },
    apellido: {
        type: String,
        default: '',
        required: 'Por favor ingrese el nombre',
        trim: true
    },
    documento: {
        type: String,
        default: '',
        required: 'Por favor ingrese el numero de documento',
        trim: true
    },
    huella: {
        type: String,
        default: '',
        required: 'No se tiene la huella',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
var Control = mongoose.model('Control' , SchemaControl);
var Empleado = mongoose.model('Empleado' , SchemaEmpleado);

socket.on('huellita', function (data) {
    var topico = data.topic.split('/')[2];
    var payload = JSON.parse(data.payload);
    if(topico === 'registrar'){
        registrarEmpleado(payload);
    }
    if(topico === 'llegada' || topico === 'partida') {
        registrarControl(topico, payload.huella);
    }

});
function registrarControl(tipo, huella){
    Empleado.findOne({huella: huella}).exec(function(err, empleado){
        var control = new Control({
            tipo: tipo,
            huella: huella,
            empleado: empleado
        });
        control.save(function (data) {
            console.log('Control realizado a: ' + empleado.apellido + ' ' + empleado.nombre);
        });
    });

}
function registrarEmpleado(empleado){
    var empleado = new Empleado(empleado);
    empleado.save(function (data) {
        console.log('Empleado Creado: ' + empleado.apellido + ' ' + empleado.nombre);
    });
}

