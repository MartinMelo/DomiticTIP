'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Dispositivo Schema
 */
var DispositivoSchema = new Schema({
	nombre: {
		type: String,
		default: '',
		required: 'Please fill Dispositivo nombre',
		trim: true
	},
    descripcion: {
		type: String,
		default: '',
		required: 'Please fill Dispositivo descripcion',
		trim: true
	},
    controlador: {
		type: String,
		default: '',
		required: 'Por favor seleccione un controlador',
		trim: true
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

mongoose.model('Dispositivo', DispositivoSchema);