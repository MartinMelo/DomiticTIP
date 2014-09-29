'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Climatizacion = mongoose.model('Climatizacion');

/**
 * Globals
 */
var user, climatizacion;

/**
 * Unit tests
 */
describe('Climatizacion Model Unit Tests:', function() {
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
			climatizacion = new Climatizacion({
				nombre: 'Climatizacion Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return climatizacion.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			climatizacion.nombre = '';

			return climatizacion.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Climatizacion.remove().exec();
		User.remove().exec();

		done();
	});
});