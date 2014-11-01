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
    temperatura: {
		type: Number,
		default: 24,
		required: 'Por Favor ingrese la temperatura'
	},
    forma: {
		type: String,
		default: '>',
		required: 'Por Favor ingrese la Forma'
	},
    controlador: {
        type: String,
        default: '',
        required: 'Por favor selecciona un controlador',
        trim: true
    },
    topico: {
        type: String,
        default: '',
        required: 'Por favor selecciona un sensor',
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