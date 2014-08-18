'use strict';

// Configuring the Articles module
angular.module('widgets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Widgets', 'Widgets', 'dropdown', '/widgets(/create)?');
		Menus.addSubMenuItem('topbar', 'Widgets', 'Disponibles', 'widgets');
		Menus.addSubMenuItem('topbar', 'Widgets', 'Agregar', 'widgets/create');
	}
]);