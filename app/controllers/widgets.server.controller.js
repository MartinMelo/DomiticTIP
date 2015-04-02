'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Widget = mongoose.model('Widget'),
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
				message = 'Widget already exists';
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
 * Create a Widget
 */
exports.create = function(req, res) {
	var widget = new Widget(req.body);
	widget.user = req.user;

	widget.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(widget);
		}
	});
};

/**
 * Show the current Widget
 */
exports.read = function(req, res) {
	res.jsonp(req.widget);
};

/**
 * Update a Widget
 */
exports.update = function(req, res) {
	var widget = req.widget ;

	widget = _.extend(widget , req.body);

	widget.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(widget);
		}
	});
};

/**
 * Delete an Widget
 */
exports.delete = function(req, res) {
	var widget = req.widget ;

	widget.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(widget);
		}
	});
};

/**
 * List of Widgets
 */
exports.list = function(req, res) { Widget.find().sort('-created').populate('user attrs.dispositivo seccion').exec(function(err, widgets) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(widgets);
		}
	});
};

/**
 * Widget middleware
 */
exports.widgetByID = function(req, res, next, id) { Widget.findById(id).populate('user attrs.dispositivo seccion').exec(function(err, widget) {
		if (err) return next(err);
		if (! widget) return next(new Error('Failed to load Widget ' + id));
		req.widget = widget ;
		next();
	});
};
exports.widgetBySeccion = function(req, res, next, seccion) {
    Widget.find({'seccion': seccion}).populate('user attrs.dispositivo seccion').exec(function(err, widget) {
		if (err) return next(err);
		if (! widget) return next(new Error('Failed to load Widget ' + seccion));
		req.widget = widget ;
		next();
	});
};
exports.widgetByUser = function(req, res, next, usuario) {
    Widget.find({'user': usuario}).populate('user attrs.dispositivo seccion').exec(function(err, widget) {
		if (err) return next(err);
		if (! widget) return next(new Error('Failed to load Widget for ' + usuario));
		req.widget = widget ;
		next();
	});
};
exports.widgetByQuery = function(req, res, next, parametros) {
    var json = JSON.parse(parametros);
    Widget.find(json).populate('user attrs.dispositivo seccion').exec(function(err, widget) {
        if (err) return next(err);
        if (! widget) return next(new Error('Failed to load Widget for: ' + json));
        req.widget = widget ;
        next();
    });
};

/**
 * Widget authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.widget.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};