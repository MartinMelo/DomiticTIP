'use strict';


angular.module('controls').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Control Empleados', 'controls', 'dropdown', '/controls(/create)?');
		Menus.addSubMenuItem('topbar', 'controls', 'Llegada', 'controls/llegadas');
		Menus.addSubMenuItem('topbar', 'controls', 'Partida', 'controls/partidas');
	}
]);