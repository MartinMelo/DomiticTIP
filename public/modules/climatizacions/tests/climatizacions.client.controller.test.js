'use strict';

(function() {
	// Climatizacions Controller Spec
	describe('Climatizacions Controller Tests', function() {
		// Initialize global variables
		var ClimatizacionsController,
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

			// Initialize the Climatizacions controller.
			ClimatizacionsController = $controller('ClimatizacionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Climatizacion object fetched from XHR', inject(function(Climatizacions) {
			// Create sample Climatizacion using the Climatizacions service
			var sampleClimatizacion = new Climatizacions({
				nombre: 'New Climatizacion'
			});

			// Create a sample Climatizacions array that includes the new Climatizacion
			var sampleClimatizacions = [sampleClimatizacion];

			// Set GET response
			$httpBackend.expectGET('climatizacions').respond(sampleClimatizacions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.climatizacions).toEqualData(sampleClimatizacions);
		}));

		it('$scope.findOne() should create an array with one Climatizacion object fetched from XHR using a climatizacionId URL parameter', inject(function(Climatizacions) {
			// Define a sample Climatizacion object
			var sampleClimatizacion = new Climatizacions({
				nombre: 'New Climatizacion'
			});

			// Set the URL parameter
			$stateParams.climatizacionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/climatizacions\/([0-9a-fA-F]{24})$/).respond(sampleClimatizacion);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.climatizacion).toEqualData(sampleClimatizacion);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Climatizacions) {
			// Create a sample Climatizacion object
			var sampleClimatizacionPostData = new Climatizacions({
				nombre: 'New Climatizacion'
			});

			// Create a sample Climatizacion response
			var sampleClimatizacionResponse = new Climatizacions({
				_id: '525cf20451979dea2c000001',
				nombre: 'New Climatizacion'
			});

			// Fixture mock form input values
			scope.nombre = 'New Climatizacion';

			// Set POST response
			$httpBackend.expectPOST('climatizacions', sampleClimatizacionPostData).respond(sampleClimatizacionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.nombre).toEqual('');

			// Test URL redirection after the Climatizacion was created
			expect($location.path()).toBe('/climatizacions/' + sampleClimatizacionResponse._id);
		}));

		it('$scope.update() should update a valid Climatizacion', inject(function(Climatizacions) {
			// Define a sample Climatizacion put data
			var sampleClimatizacionPutData = new Climatizacions({
				_id: '525cf20451979dea2c000001',
				nombre: 'New Climatizacion'
			});

			// Mock Climatizacion in scope
			scope.climatizacion = sampleClimatizacionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/climatizacions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/climatizacions/' + sampleClimatizacionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid climatizacionId and remove the Climatizacion from the scope', inject(function(Climatizacions) {
			// Create new Climatizacion object
			var sampleClimatizacion = new Climatizacions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Climatizacions array and include the Climatizacion
			scope.climatizacions = [sampleClimatizacion];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/climatizacions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleClimatizacion);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.climatizacions.length).toBe(0);
		}));
	});
}());