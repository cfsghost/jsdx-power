var Power = require('../');

var power = new Power;

power.init(function() {
	console.log('CanSuspend: ' + power.canSuspend);
	console.log('CanHibernate: ' + power.canHibernate);
	console.log('Has Battery: ' + power.hasBattery);
	console.log('OnBattery: ' + power.onBattery);
	console.log('OnLowBattery: ' + power.onLowBattery);
	console.log('Lid is Closed: ' + power.lidIsClosed);
	console.log('Has Lid: ' + power.hasLid);
});
