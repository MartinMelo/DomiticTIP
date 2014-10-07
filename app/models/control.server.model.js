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
	empleado: {
		type: Schema.ObjectId,
		ref: 'Empleado'
	}
});

mongoose.model('Control', ControlSchema);