'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Widget Schema
 */
var WidgetSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Por favor seleccione el tipo de Widget',
		trim: true
	},
    title: {
        type: String,
        default: '',
        required: 'Por favor ingrese un titulo',
        trim: true
    },
    seccion: {
		type: String,
		default: 'inicio',
		required: 'Por favor seleccione una seccion',
		trim: true
	},
    attrs: {
        value: {
            type: String,
            required: 'No se esta generando el value',
            trim: true
        },
        nombre: {
            type: String,
            required: 'No se esta guardando el nombre de Topico de socket.io',
            trim: true
        },
        topico: {
            type: String,
            required: 'No se esta guardando el Topico de socket.io',
            trim: true
        },
        controlador: {
            type: String,
            required: 'Por favor seleccione el controlador',
            trim: true
        }
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

mongoose.model('Widget', WidgetSchema);