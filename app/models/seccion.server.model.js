'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Seccion Schema
 */
var SeccionSchema = new Schema({
    nombre: {
		type: String,
		default: '',
		required: 'Please fill Seccion name',
		trim: true
	},
    descripcion: {
		type: String,
		default: '',
		required: 'Please fill Seccion descripcion',
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

mongoose.model('Seccion', SeccionSchema);