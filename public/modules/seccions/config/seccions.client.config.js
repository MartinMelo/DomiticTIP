'use strict';

// Configuring the Articles module
angular.module('seccions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Secciones', 'seccions', 'dropdown', '/seccions(/create)?');
		Menus.addSubMenuItem('topbar', 'seccions', 'Diponibles', 'seccions');
		Menus.addSubMenuItem('topbar', 'seccions', 'Agregar', 'seccions/create');
	}
]);