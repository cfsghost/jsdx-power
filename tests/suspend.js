var Power = require('../');

var power = new Power;

power.init(function() {
	power.suspend(function() {
		console.log('Welcome back');
	});
});
