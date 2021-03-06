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
		required: 'Por favor ingresa un nombre para la tarea automatica.',
		trim: true
	},
    datos: {
		tipo:{
            type: String,
            default: '',
            required: 'Por favor ingresa el tipo de la tarea automatica.',
            trim: true
        },
        calendario:{
            type: Object,
            default: {},
            required: 'No se generaron los datos de la tarea.',
            trim: false
        },
        informacion:{
            type: Object,
            default: {},
            required: 'No se generaron los datos de la tarea.',
            trim: false
        },
        topico:{
            type: Object,
            default: {},
            required: 'No se generaron los datos de la tarea.',
            trim: false
        },
        dispositivo:{
            type: Schema.ObjectId,
            ref: 'Dispositivo'
        }
	},
    usada:{
      type: Boolean,
      default: false
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