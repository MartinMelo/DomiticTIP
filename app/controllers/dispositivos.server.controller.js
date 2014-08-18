'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Dispositivo = mongoose.model('Dispositivo'),
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
				message = 'Dispositivo already exists';
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
 * Create a Dispositivo
 */
exports.create = function(req, res) {
	var dispositivo = new Dispositivo(req.body);
	dispositivo.user = req.user;

	dispositivo.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(dispositivo);
		}
	});
};

/**
 * Show the current Dispositivo
 */
exports.read = function(req, res) {
	res.jsonp(req.dispositivo);
};

/**
 * Update a Dispositivo
 */
exports.update = function(req, res) {
	var dispositivo = req.dispositivo ;

	dispositivo = _.extend(dispositivo , req.body);

	dispositivo.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(dispositivo);
		}
	});
};

/**
 * Delete an Dispositivo
 */
exports.delete = function(req, res) {
	var dispositivo = req.dispositivo ;

	dispositivo.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(dispositivo);
		}
	});
};

/**
 * List of Dispositivos
 */
exports.list = function(req, res) { Dispositivo.find().sort('-created').populate('user', 'displayName').exec(function(err, dispositivos) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(dispositivos);
		}
	});
};

/**
 * Dispositivo middleware
 */
exports.dispositivoByID = function(req, res, next, id) { Dispositivo.findById(id).populate('user', 'displayName').exec(function(err, dispositivo) {
		if (err) return next(err);
		if (! dispositivo) return next(new Error('Failed to load Dispositivo ' + id));
		req.dispositivo = dispositivo ;
		next();
	});
};

/**
 * Dispositivo authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.dispositivo.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};