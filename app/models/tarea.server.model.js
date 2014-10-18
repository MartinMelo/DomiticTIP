'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tarea Schema
 */
var TareaSchema = new Schema({
	nombre: {
		type: String,
		default: '',
		required: 'Porfavor ingresa un nombre para la tarea automatica.',
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

mongoose.model('Tarea', TareaSchema);