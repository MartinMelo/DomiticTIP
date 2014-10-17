'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Tarea = mongoose.model('Tarea'),
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
				message = 'Tarea already exists';
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
 * Create a Tarea
 */
exports.create = function(req, res) {
	var tarea = new Tarea(req.body);
	tarea.user = req.user;

	tarea.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(tarea);
		}
	});
};

/**
 * Show the current Tarea
 */
exports.read = function(req, res) {
	res.jsonp(req.tarea);
};

/**
 * Update a Tarea
 */
exports.update = function(req, res) {
	var tarea = req.tarea ;

	tarea = _.extend(tarea , req.body);

	tarea.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(tarea);
		}
	});
};

/**
 * Delete an Tarea
 */
exports.delete = function(req, res) {
	var tarea = req.tarea ;

	tarea.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(tarea);
		}
	});
};

/**
 * List of Tareas
 */
exports.list = function(req, res) { Tarea.find().sort('-created').populate('user', 'displayName').exec(function(err, tareas) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(tareas);
		}
	});
};

/**
 * Tarea middleware
 */
exports.tareaByID = function(req, res, next, id) { Tarea.findById(id).populate('user', 'displayName').exec(function(err, tarea) {
		if (err) return next(err);
		if (! tarea) return next(new Error('Failed to load Tarea ' + id));
		req.tarea = tarea ;
		next();
	});
};

/**
 * Tarea authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.tarea.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};