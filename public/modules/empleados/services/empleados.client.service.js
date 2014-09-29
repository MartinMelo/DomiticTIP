'use strict';

//Empleados service used to communicate Empleados REST endpoints
angular.module('empleados').factory('Empleados', ['$resource',
	function($resource) {
		return $resource('empleados/:empleadoId', { empleadoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);