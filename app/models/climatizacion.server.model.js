'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Climatizacion Schema
 */
var ClimatizacionSchema = new Schema({
	nombre: {
		type: String,
		default: '',
		required: 'Please fill Climatizacion nombre',
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

mongoose.model('Climatizacion', ClimatizacionSchema);