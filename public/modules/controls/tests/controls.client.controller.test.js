'use strict';

(function() {
	// Controls Controller Spec
	describe('Controls Controller Tests', function() {
		// Initialize global variables
		var ControlsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Controls controller.
			ControlsController = $controller('ControlsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Control object fetched from XHR', inject(function(Controls) {
			// Create sample Control using the Controls service
			var sampleControl = new Controls({
				name: 'New Control'
			});

			// Create a sample Controls array that includes the new Control
			var sampleControls = [sampleControl];

			// Set GET response
			$httpBackend.expectGET('controls').respond(sampleControls);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.controls).toEqualData(sampleControls);
		}));

		it('$scope.findOne() should create an array with one Control object fetched from XHR using a controlId URL parameter', inject(function(Controls) {
			// Define a sample Control object
			var sampleControl = new Controls({
				name: 'New Control'
			});

			// Set the URL parameter
			$stateParams.controlId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/controls\/([0-9a-fA-F]{24})$/).respond(sampleControl);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.control).toEqualData(sampleControl);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Controls) {
			// Create a sample Control object
			var sampleControlPostData = new Controls({
				name: 'New Control'
			});

			// Create a sample Control response
			var sampleControlResponse = new Controls({
				_id: '525cf20451979dea2c000001',
				name: 'New Control'
			});

			// Fixture mock form input values
			scope.name = 'New Control';

			// Set POST response
			$httpBackend.expectPOST('controls', sampleControlPostData).respond(sampleControlResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Control was created
			expect($location.path()).toBe('/controls/' + sampleControlResponse._id);
		}));

		it('$scope.update() should update a valid Control', inject(function(Controls) {
			// Define a sample Control put data
			var sampleControlPutData = new Controls({
				_id: '525cf20451979dea2c000001',
				name: 'New Control'
			});

			// Mock Control in scope
			scope.control = sampleControlPutData;

			// Set PUT response
			$httpBackend.expectPUT(/controls\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/controls/' + sampleControlPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid controlId and remove the Control from the scope', inject(function(Controls) {
			// Create new Control object
			var sampleControl = new Controls({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Controls array and include the Control
			scope.controls = [sampleControl];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/controls\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleControl);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.controls.length).toBe(0);
		}));
	});
}());