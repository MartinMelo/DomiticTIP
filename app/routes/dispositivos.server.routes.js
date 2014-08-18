'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var dispositivos = require('../../app/controllers/dispositivos');

	// Dispositivos Routes
	app.route('/dispositivos')
		.get(dispositivos.list)
		.post(users.requiresLogin, dispositivos.create);

	app.route('/dispositivos/:dispositivoId')
		.get(dispositivos.read)
		.put(users.requiresLogin, dispositivos.hasAuthorization, dispositivos.update)
		.delete(users.requiresLogin, dispositivos.hasAuthorization, dispositivos.delete);

	// Finish by binding the Dispositivo middleware
	app.param('dispositivoId', dispositivos.dispositivoByID);
};