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
	name: {
		type: String,
		default: '',
		required: 'Please fill Seccion name',
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