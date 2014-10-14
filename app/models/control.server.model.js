'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Control Schema
 */
var ControlSchema = new Schema({
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
    huella: {
        type: String,
        default: '',
        required: 'No se tiene la huella',
        trim: true
    }
});

mongoose.model('Control', ControlSchema);