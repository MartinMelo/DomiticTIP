'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Control = mongoose.model('Control'),
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
				message = 'Control already exists';
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
 * Create a Control
 */
exports.create = function(req, res) {
	var control = new Control(req.body);
	control.empleado = req.empleado;

	control.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(control);
		}
	});
};

/**
 * Show the current Control
 */
exports.read = function(req, res) {
	res.jsonp(req.control);
};

/**
 * Update a Control
 */
exports.update = function(req, res) {
	var control = req.control ;

	control = _.extend(control , req.body);

	control.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(control);
		}
	});
};

/**
 * Delete an Control
 */
exports.delete = function(req, res) {
	var control = req.control ;

	control.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(control);
		}
	});
};

/**
 * List of Controls
 */
exports.list = function(req, res) { Control.find().sort('-horario').populate('empleado').exec(function(err, controls) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(controls);
		}
	});
};
/**
 * Partidas
 */
exports.partidas = function(req, res) { Control.find({tipo: 'partida'}).sort('-horario').populate('empleado').exec(function(err, controls) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(controls);
		}
	});
};
/**
 * Llegadas
 */
exports.llegadas = function(req, res) { Control.find({tipo: 'llegada'}).sort('-horario').populate('empleado').exec(function(err, controls) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(controls);
		}
	});
};

/**
 * Control middleware
 */
exports.controlByID = function(req, res, next, id) { Control.findById(id).populate('empleado').exec(function(err, control) {
		if (err) return next(err);
		if (! control) return next(new Error('Failed to load Control ' + id));
		req.control = control ;
		next();
	});
};

/**
 * Control authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.control.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};