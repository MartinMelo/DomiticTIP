'use strict';

angular.module('configuracion').directive('leftPanel', [
	function() {
		return {
			templateUrl: 'modules/configuracion/views/left-panel.client.view.html',
			restrict: 'E'
		};
	}
]);