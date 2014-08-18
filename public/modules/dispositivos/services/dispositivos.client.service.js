'use strict';

//Dispositivos service used to communicate Dispositivos REST endpoints
angular.module('dispositivos').factory('Dispositivos', ['$resource',
	function($resource) {
		return $resource('dispositivos/:dispositivoId', { dispositivoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);