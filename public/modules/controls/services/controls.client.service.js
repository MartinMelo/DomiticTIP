'use strict';

//Controls service used to communicate Controls REST endpoints
angular.module('controls').factory('Controls', ['$resource',
	function($resource) {
		return $resource('controls/:controlId', { controlId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);