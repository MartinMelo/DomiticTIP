'use strict';

angular.module('widgets').directive('widgetsInicio', [
	function() {
		return {
			templateUrl: 'modules/widgets/views/widgets-inicio.client.view.html',
			restrict: 'E'
		};
	}
]);