'use strict';

(function() {
	// Dispositivos Controller Spec
	describe('Dispositivos Controller Tests', function() {
		// Initialize global variables
		var DispositivosController,
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

			// Initialize the Dispositivos controller.
			DispositivosController = $controller('DispositivosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Dispositivo object fetched from XHR', inject(function(Dispositivos) {
			// Create sample Dispositivo using the Dispositivos service
			var sampleDispositivo = new Dispositivos({
				name: 'New Dispositivo'
			});

			// Create a sample Dispositivos array that includes the new Dispositivo
			var sampleDispositivos = [sampleDispositivo];

			// Set GET response
			$httpBackend.expectGET('dispositivos').respond(sampleDispositivos);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.dispositivos).toEqualData(sampleDispositivos);
		}));

		it('$scope.findOne() should create an array with one Dispositivo object fetched from XHR using a dispositivoId URL parameter', inject(function(Dispositivos) {
			// Define a sample Dispositivo object
			var sampleDispositivo = new Dispositivos({
				name: 'New Dispositivo'
			});

			// Set the URL parameter
			$stateParams.dispositivoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/dispositivos\/([0-9a-fA-F]{24})$/).respond(sampleDispositivo);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.dispositivo).toEqualData(sampleDispositivo);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Dispositivos) {
			// Create a sample Dispositivo object
			var sampleDispositivoPostData = new Dispositivos({
				name: 'New Dispositivo'
			});

			// Create a sample Dispositivo response
			var sampleDispositivoResponse = new Dispositivos({
				_id: '525cf20451979dea2c000001',
				name: 'New Dispositivo'
			});

			// Fixture mock form input values
			scope.name = 'New Dispositivo';

			// Set POST response
			$httpBackend.expectPOST('dispositivos', sampleDispositivoPostData).respond(sampleDispositivoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Dispositivo was created
			expect($location.path()).toBe('/dispositivos/' + sampleDispositivoResponse._id);
		}));

		it('$scope.update() should update a valid Dispositivo', inject(function(Dispositivos) {
			// Define a sample Dispositivo put data
			var sampleDispositivoPutData = new Dispositivos({
				_id: '525cf20451979dea2c000001',
				name: 'New Dispositivo'
			});

			// Mock Dispositivo in scope
			scope.dispositivo = sampleDispositivoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/dispositivos\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/dispositivos/' + sampleDispositivoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid dispositivoId and remove the Dispositivo from the scope', inject(function(Dispositivos) {
			// Create new Dispositivo object
			var sampleDispositivo = new Dispositivos({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Dispositivos array and include the Dispositivo
			scope.dispositivos = [sampleDispositivo];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/dispositivos\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDispositivo);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.dispositivos.length).toBe(0);
		}));
	});
}());