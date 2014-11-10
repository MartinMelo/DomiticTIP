'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Empleado Schema
 */
var EmpleadoSchema = new Schema({
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

mongoose.model('Empleado', EmpleadoSchema);