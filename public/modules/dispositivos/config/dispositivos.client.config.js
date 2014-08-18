'use strict';

// Configuring the Articles module
angular.module('dispositivos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Dispositivos', 'dispositivos', 'dropdown', '/dispositivos(/create)?');
		Menus.addSubMenuItem('topbar', 'dispositivos', 'Disponibles', 'dispositivos');
		Menus.addSubMenuItem('topbar', 'dispositivos', 'Agregar', 'dispositivos/create');
	}
]);