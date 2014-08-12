'use strict';

// Configuring the Articles module
angular.module('widgets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Widgets', 'Widgets', 'dropdown', '/widgets(/create)?');
		Menus.addSubMenuItem('topbar', 'Widgets', 'List widgets', 'widgets');
		Menus.addSubMenuItem('topbar', 'Widgets', 'New widgets', 'widgets/create');
	}
]);