var Power = require('../');

var power = new Power;

power.init(function() {

	power.getBattery(null, function(err, battery) {

		battery.getPercentage(function(err, value) {
			console.log('Battery percentage is ' + value + '% now.');

			process.exit();
		});
	});
});
