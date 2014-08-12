'use strict';

//Widgets service used to communicate Widgets REST endpoints
angular.module('widgets').factory('Widgets', ['$resource',
	function($resource) {
		return $resource('widgets/:widgetId', { widgetId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);