'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var widgets = require('../../app/controllers/widgets');

	// Widgets Routes
	app.route('/widgets')
		.get(widgets.list)
		.post(users.requiresLogin, widgets.create);

	app.route('/widgets/:widgetId')
		.get(widgets.read)
		.put(users.requiresLogin, widgets.hasAuthorization, widgets.update)
		.delete(users.requiresLogin, widgets.hasAuthorization, widgets.delete);

    app.route('/widgets/seccion/:widgetSeccion')
        .get(widgets.read)
        .put(users.requiresLogin, widgets.hasAuthorization, widgets.update)
        .delete(users.requiresLogin, widgets.hasAuthorization, widgets.delete);
    app.route('/widgets/usuario/:widgetUser')
        .get(widgets.read)
        .put(users.requiresLogin, widgets.hasAuthorization, widgets.update)
        .delete(users.requiresLogin, widgets.hasAuthorization, widgets.delete);
    app.route('/widgets/query/:widgetParam')
        .get(widgets.read)
        .put(users.requiresLogin, widgets.hasAuthorization, widgets.update)
        .delete(users.requiresLogin, widgets.hasAuthorization, widgets.delete);

	// Finish by binding the Widget middleware
	app.param('widgetId', widgets.widgetByID);
	app.param('widgetSeccion', widgets.widgetBySeccion);
    app.param('widgetUser', widgets.widgetByUser);
    app.param('widgetParam', widgets.widgetByQuery);
};