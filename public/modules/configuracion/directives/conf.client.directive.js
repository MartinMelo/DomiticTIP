'use strict';

var app = angular.module('configuracion');
app.directive('conf', [	function() {
		return {
			templateUrl: 'modules/configuracion/views/conf.client.view.html',
			restrict: 'E'
		};
	}
]);