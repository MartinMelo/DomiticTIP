'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Empleado = mongoose.model('Empleado'),
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
				message = 'Empleado already exists';
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
 * Create a Empleado
 */
exports.create = function(req, res) {
	var empleado = new Empleado(req.body);
	empleado.user = req.user;

	empleado.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(empleado);
		}
	});
};

/**
 * Show the current Empleado
 */
exports.read = function(req, res) {
	res.jsonp(req.empleado);
};

/**
 * Update a Empleado
 */
exports.update = function(req, res) {
	var empleado = req.empleado ;

	empleado = _.extend(empleado , req.body);

	empleado.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(empleado);
		}
	});
};

/**
 * Delete an Empleado
 */
exports.delete = function(req, res) {
	var empleado = req.empleado ;

	empleado.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(empleado);
		}
	});
};

/**
 * List of Empleados
 */
exports.list = function(req, res) { Empleado.find().sort('-created').populate('user', 'displayName').exec(function(err, empleados) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(empleados);
		}
	});
};

/**
 * Empleado middleware
 */
exports.empleadoByID = function(req, res, next, id) { Empleado.findById(id).populate('user', 'displayName').exec(function(err, empleado) {
		if (err) return next(err);
		if (! empleado) return next(new Error('Failed to load Empleado ' + id));
		req.empleado = empleado ;
		next();
	});
};

/**
 * Empleado authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.empleado.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};