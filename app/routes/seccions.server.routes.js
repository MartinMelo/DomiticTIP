'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var seccions = require('../../app/controllers/seccions');

	// Seccions Routes
	app.route('/seccions')
		.get(seccions.list)
		.post(users.requiresLogin, seccions.create);

	app.route('/seccions/:seccionId')
		.get(seccions.read)
		.put(users.requiresLogin, seccions.hasAuthorization, seccions.update)
		.delete(users.requiresLogin, seccions.hasAuthorization, seccions.delete);
    app.route('/seccions/query/:seccionParam')
		.get(seccions.read)
		.put(users.requiresLogin, seccions.hasAuthorization, seccions.update)
		.delete(users.requiresLogin, seccions.hasAuthorization, seccions.delete);

	// Finish by binding the Seccion middleware
	app.param('seccionId', seccions.seccionByID);
	app.param('seccionParam', seccions.seccionByQuery);
};