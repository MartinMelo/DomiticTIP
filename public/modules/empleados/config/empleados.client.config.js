'use strict';

// Configuring the Articles module
angular.module('empleados').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Empleados', 'empleados', 'dropdown', '/empleados(/create)?');
		Menus.addSubMenuItem('topbar', 'empleados', 'List Empleados', 'empleados');
	}
]);