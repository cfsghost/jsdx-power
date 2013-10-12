var Power = require('../');

var power = new Power;

power.init(function() {
	power.hibernate(function() {
		console.log('Welcome back');
	});
});
