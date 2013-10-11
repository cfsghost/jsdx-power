var Power = require('../');

var power = new Power;

power.init(function() {

	power.getBatteries(function(err, batteries) {
		console.log(batteries);

		process.exit();
	});
});
