var Power = require('../');

var power = new Power;

power.init(function() {
	power.listDevices(function(err, devices) {
		for (var index in devices) {
			console.log(devices[index]);
		}

		process.exit();
	});
});
