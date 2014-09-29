'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Widget = mongoose.model('Widget');

/**
 * Globals
 */
var user, widget;

/**
 * Unit tests
 */
describe('Widget Model Unit Tests:', function() {
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
			widget = new Widget({
				name: 'Widget Name',
                title: 'Titulo nombre',
                seccion: 'seccion nombre',
                attrs: {
                    value:'un valor',
                    topico:'un topico',
                    controlador:'un controlador'
                },
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return widget.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			widget.name = '';

			return widget.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Widget.remove().exec();
		User.remove().exec();

		done();
	});
});