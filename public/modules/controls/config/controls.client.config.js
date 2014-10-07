'use strict';

// Configuring the Articles module
angular.module('controls').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Control Empleados', 'controls', 'dropdown', '/controls(/create)?');
		Menus.addSubMenuItem('topbar', 'controls', 'Llegada', 'controls/llegada');
		Menus.addSubMenuItem('topbar', 'controls', 'Partida', 'controls/partida');
		Menus.addSubMenuItem('topbar', 'controls', 'Reportes', 'controls/reportes');
	}
]);