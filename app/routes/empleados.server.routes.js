'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var empleados = require('../../app/controllers/empleados');

	// Empleados Routes
	app.route('/empleados')
		.get(empleados.list)
		.post(users.requiresLogin, empleados.create);

	app.route('/empleados/:empleadoId')
		.get(empleados.read)
		.put(users.requiresLogin, empleados.hasAuthorization, empleados.update)
		.delete(users.requiresLogin, empleados.hasAuthorization, empleados.delete);

	// Finish by binding the Empleado middleware
	app.param('empleadoId', empleados.empleadoByID);
};