'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var climatizacions = require('../../app/controllers/climatizacions');

	// Climatizacions Routes
	app.route('/climatizacions')
		.get(climatizacions.list)
		.post(users.requiresLogin, climatizacions.create);

	app.route('/climatizacions/:climatizacionId')
		.get(climatizacions.read)
		.put(users.requiresLogin, climatizacions.hasAuthorization, climatizacions.update)
		.delete(users.requiresLogin, climatizacions.hasAuthorization, climatizacions.delete);

	// Finish by binding the Climatizacion middleware
	app.param('climatizacionId', climatizacions.climatizacionByID);
};