var Power = require('../');

var power = new Power();
power.init(function() {
	power.isDocked(function(err, docked) {
		console.log(docked);
		process.exit();
	});
});
