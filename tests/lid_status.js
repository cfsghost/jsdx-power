var Power = require('../');

var power = new Power();
power.init(function() {

	power.hasLid(function(err, exists) {

		if (exists)
			console.log('Lid is present');
		else
			console.log('Lid doesn\'t exists');


		power.isLidClosed(function(err, closed) {

			if (closed)
				console.log('Lid is closed');
			else
				console.log('Lid is open');

			process.exit();
		})
	});
});
