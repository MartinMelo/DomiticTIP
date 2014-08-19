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
		required: 'Please fill Widget name',
		trim: true
	},
    title: {
        type: String,
        default: '',
        required: 'Please fill Widget title',
        trim: true
    },
    seccion: {
		type: String,
		default: 'inicio',
		required: 'Please fill section name',
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

mongoose.model('Widget', WidgetSchema);