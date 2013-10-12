var Power = require('../');

var power = new Power();
power.init(function() {
	power.onBattery(function(err, used) {
		console.log(used);
		process.exit();
	});
});
