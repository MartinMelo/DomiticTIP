'use strict';

angular.module('configuracion').directive('mainPanel', [
	function() {
		return {
			templateUrl: 'modules/configuracion/views/main-panel.client.view.html',
			restrict: 'E'
		};
	}
]);