'use strict';

(function() {
	// Seccions Controller Spec
	describe('Seccions Controller Tests', function() {
		// Initialize global variables
		var SeccionsController,
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

			// Initialize the Seccions controller.
			SeccionsController = $controller('SeccionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Seccion object fetched from XHR', inject(function(Seccions) {
			// Create sample Seccion using the Seccions service
			var sampleSeccion = new Seccions({
				nombre: 'New Seccion',
                descripcion: 'nueva descripcion'
			});

			// Create a sample Seccions array that includes the new Seccion
			var sampleSeccions = [sampleSeccion];

			// Set GET response
			$httpBackend.expectGET('seccions').respond(sampleSeccions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.seccions).toEqualData(sampleSeccions);
		}));

		it('$scope.findOne() should create an array with one Seccion object fetched from XHR using a seccionId URL parameter', inject(function(Seccions) {
			// Define a sample Seccion object
			var sampleSeccion = new Seccions({
                nombre: 'New Seccion',
                descripcion: 'nueva descripcion'
			});

			// Set the URL parameter
			$stateParams.seccionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/seccions\/([0-9a-fA-F]{24})$/).respond(sampleSeccion);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.seccion).toEqualData(sampleSeccion);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Seccions) {
			// Create a sample Seccion object
			var sampleSeccionPostData = new Seccions({
                nombre: 'New Seccion',
                descripcion: 'nueva descripcion'
			});

			// Create a sample Seccion response
			var sampleSeccionResponse = new Seccions({
				_id: '525cf20451979dea2c000001',
                nombre: 'New Seccion',
                descripcion: 'nueva descripcion'
			});

			// Fixture mock form input values
			scope.nombre = 'New Seccion';

			// Set POST response
			$httpBackend.expectPOST('seccions', sampleSeccionPostData).respond(sampleSeccionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Seccion was created
			expect($location.path()).toBe('/seccions/' + sampleSeccionResponse._id);
		}));

		it('$scope.update() should update a valid Seccion', inject(function(Seccions) {
			// Define a sample Seccion put data
			var sampleSeccionPutData = new Seccions({
				_id: '525cf20451979dea2c000001',
                nombre: 'New Seccion',
                descripcion: 'nueva descripcion'
			});

			// Mock Seccion in scope
			scope.seccion = sampleSeccionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/seccions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/seccions/' + sampleSeccionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid seccionId and remove the Seccion from the scope', inject(function(Seccions) {
			// Create new Seccion object
			var sampleSeccion = new Seccions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Seccions array and include the Seccion
			scope.seccions = [sampleSeccion];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/seccions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSeccion);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.seccions.length).toBe(0);
		}));
	});
}());