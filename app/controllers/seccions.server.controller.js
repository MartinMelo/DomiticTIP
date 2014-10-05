'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Seccion = mongoose.model('Seccion'),
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
				message = 'Seccion already exists';
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
 * Create a Seccion
 */
exports.create = function(req, res) {
	var seccion = new Seccion(req.body);
	seccion.user = req.user;

	seccion.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(seccion);
		}
	});
};

/**
 * Show the current Seccion
 */
exports.read = function(req, res) {
	res.jsonp(req.seccion);
};

/**
 * Update a Seccion
 */
exports.update = function(req, res) {
	var seccion = req.seccion ;

	seccion = _.extend(seccion , req.body);

	seccion.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(seccion);
		}
	});
};

/**
 * Delete an Seccion
 */
exports.delete = function(req, res) {
	var seccion = req.seccion ;

	seccion.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(seccion);
		}
	});
};

/**
 * List of Seccions
 */
exports.list = function(req, res) { Seccion.find().sort('-created').populate('user', 'displayName').exec(function(err, seccions) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(seccions);
		}
	});
};

/**
 * Seccion middleware
 */
exports.seccionByID = function(req, res, next, id) { Seccion.findById(id).populate('user', 'displayName').exec(function(err, seccion) {
		if (err) return next(err);
		if (! seccion) return next(new Error('Failed to load Seccion ' + id));
		req.seccion = seccion ;
		next();
	});
};
exports.seccionByQuery = function(req, res, next, parametros) {
    var json = JSON.parse(parametros);
    Seccion.find(json).populate('user', 'displayName').exec(function(err, seccion) {
		if (err) return next(err);
		if (! seccion) return next(new Error('Failed to load Seccion ' + json));
		req.seccion = seccion ;
		next();
	});
};

/**
 * Seccion authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.seccion.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};