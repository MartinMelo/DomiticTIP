'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus','$location','$rootScope',
	function($scope, Authentication, Menus,$location,$rootScope) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

        var ip = $location.$$host +':3000';
        var socket = io.connect(ip);
        $rootScope.socket = socket;
	}
]);