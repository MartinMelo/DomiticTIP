'use strict';

//Climatizacions service used to communicate Climatizacions REST endpoints
angular.module('climatizacions').factory('Climatizacions', ['$resource',
	function($resource) {
		return $resource('climatizacions/:climatizacionId', { climatizacionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);