'use strict';

//Seccions service used to communicate Seccions REST endpoints
angular.module('seccions').factory('Seccions', ['$resource',
	function($resource) {
		return $resource('seccions/:seccionId', { seccionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);