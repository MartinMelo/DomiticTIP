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
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Empleado', EmpleadoSchema);