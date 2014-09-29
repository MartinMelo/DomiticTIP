'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Empleado = mongoose.model('Empleado');

/**
 * Globals
 */
var user, empleado;

/**
 * Unit tests
 */
describe('Empleado Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			empleado = new Empleado({
				nombre: 'Empleado nombre',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return empleado.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without nombre', function(done) {
			empleado.nombre = '';

			return empleado.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Empleado.remove().exec();
		User.remove().exec();

		done();
	});
});