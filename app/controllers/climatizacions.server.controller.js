'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Climatizacion = mongoose.model('Climatizacion'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Climatizacion already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Climatizacion
 */
exports.create = function(req, res) {
	var climatizacion = new Climatizacion(req.body);
	climatizacion.user = req.user;

	climatizacion.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(climatizacion);
		}
	});
};

/**
 * Show the current Climatizacion
 */
exports.read = function(req, res) {
	res.jsonp(req.climatizacion);
};

/**
 * Update a Climatizacion
 */
exports.update = function(req, res) {
	var climatizacion = req.climatizacion ;

	climatizacion = _.extend(climatizacion , req.body);

	climatizacion.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(climatizacion);
		}
	});
};

/**
 * Delete an Climatizacion
 */
exports.delete = function(req, res) {
	var climatizacion = req.climatizacion ;

	climatizacion.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(climatizacion);
		}
	});
};

/**
 * List of Climatizacions
 */
exports.list = function(req, res) { Climatizacion.find().sort('-created').populate('user dispositivo').exec(function(err, climatizacions) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(climatizacions);
		}
	});
};

/**
 * Climatizacion middleware
 */
exports.climatizacionByID = function(req, res, next, id) { Climatizacion.findById(id).populate('user dispositivo').exec(function(err, climatizacion) {
		if (err) return next(err);
		if (! climatizacion) return next(new Error('Failed to load Climatizacion ' + id));
		req.climatizacion = climatizacion ;
		next();
	});
};

/**
 * Climatizacion authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.climatizacion.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};