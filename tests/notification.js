var Power = require('../');

var power = new Power();
power.init(function() {
	power.on('Changed', function() {
		console.log('Changed');
	});
});
