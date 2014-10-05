'use strict';

angular.module('widgets').directive('configurar', [
	function() {
		return {
			templateUrl: 'modules/widgets/views/configurar.client.view.html',
			restrict: 'E'
		};
	}
]);