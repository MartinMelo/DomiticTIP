'use strict';

// Controls controller
angular.module('controls').controller('ControlsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Controls',
	function($scope, $stateParams, $location, Authentication, Controls ) {
		$scope.authentication = Authentication;

		// Create new Control
		$scope.create = function() {
			// Create new Control object
			var control = new Controls ({
				name: this.name
			});

			// Redirect after save
			control.$save(function(response) {
				$location.path('controls/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Control
		$scope.remove = function( control ) {
			if ( control ) { control.$remove();

				for (var i in $scope.controls ) {
					if ($scope.controls [i] === control ) {
						$scope.controls.splice(i, 1);
					}
				}
			} else {
				$scope.control.$remove(function() {
					$location.path('controls');
				});
			}
		};

		// Update existing Control
		$scope.update = function() {
			var control = $scope.control ;

			control.$update(function() {
				$location.path('controls/' + control._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Controls
		$scope.find = function() {
			$scope.controls = Controls.query();
		};

		// Find existing Control
		$scope.findOne = function() {
			$scope.control = Controls.get({ 
				controlId: $stateParams.controlId
			});
		};
	}
]);