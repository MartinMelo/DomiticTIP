'use strict';

(function() {
	// Empleados Controller Spec
	describe('Empleados Controller Tests', function() {
		// Initialize global variables
		var EmpleadosController,
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

			// Initialize the Empleados controller.
			EmpleadosController = $controller('EmpleadosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Empleado object fetched from XHR', inject(function(Empleados) {
			// Create sample Empleado using the Empleados service
			var sampleEmpleado = new Empleados({
				name: 'New Empleado'
			});

			// Create a sample Empleados array that includes the new Empleado
			var sampleEmpleados = [sampleEmpleado];

			// Set GET response
			$httpBackend.expectGET('empleados').respond(sampleEmpleados);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.empleados).toEqualData(sampleEmpleados);
		}));

		it('$scope.findOne() should create an array with one Empleado object fetched from XHR using a empleadoId URL parameter', inject(function(Empleados) {
			// Define a sample Empleado object
			var sampleEmpleado = new Empleados({
				name: 'New Empleado'
			});

			// Set the URL parameter
			$stateParams.empleadoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/empleados\/([0-9a-fA-F]{24})$/).respond(sampleEmpleado);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.empleado).toEqualData(sampleEmpleado);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Empleados) {
			// Create a sample Empleado object
			var sampleEmpleadoPostData = new Empleados({
				name: 'New Empleado'
			});

			// Create a sample Empleado response
			var sampleEmpleadoResponse = new Empleados({
				_id: '525cf20451979dea2c000001',
				name: 'New Empleado'
			});

			// Fixture mock form input values
			scope.name = 'New Empleado';

			// Set POST response
			$httpBackend.expectPOST('empleados', sampleEmpleadoPostData).respond(sampleEmpleadoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Empleado was created
			expect($location.path()).toBe('/empleados/' + sampleEmpleadoResponse._id);
		}));

		it('$scope.update() should update a valid Empleado', inject(function(Empleados) {
			// Define a sample Empleado put data
			var sampleEmpleadoPutData = new Empleados({
				_id: '525cf20451979dea2c000001',
				name: 'New Empleado'
			});

			// Mock Empleado in scope
			scope.empleado = sampleEmpleadoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/empleados\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/empleados/' + sampleEmpleadoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid empleadoId and remove the Empleado from the scope', inject(function(Empleados) {
			// Create new Empleado object
			var sampleEmpleado = new Empleados({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Empleados array and include the Empleado
			scope.empleados = [sampleEmpleado];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/empleados\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEmpleado);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.empleados.length).toBe(0);
		}));
	});
}());