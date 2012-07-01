var Power = require('../');

var power = new Power;

power.init(function() {
	console.log(power.devices['/org/freedesktop/UPower/devices/battery_BAT0'].percentage);
});
