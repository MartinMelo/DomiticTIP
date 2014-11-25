'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var controls = require('../../app/controllers/controls');

	// Controls Routes
	app.route('/controls')
		.get(controls.list)
		.post(users.requiresLogin, controls.create);

    app.route('/controls/llegadas')
		.get(controls.llegadas)
		.post(users.requiresLogin, controls.create);
    app.route('/controls/partidas')
		.get(controls.partidas)
		.post(users.requiresLogin, controls.create);

	app.route('/controls/:controlId')
		.get(controls.read)
		.put(users.requiresLogin, controls.hasAuthorization, controls.update)
		.delete(users.requiresLogin, controls.hasAuthorization, controls.delete);

	// Finish by binding the Control middleware
	app.param('controlId', controls.controlByID);
};