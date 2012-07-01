
var DeviceType = [
	'Unknown',
	'Line Power',
	'Battery',
	'UPS',
	'Monitor',
	'Mouse',
	'Keyboard',
	'Pda',
	'Phone'
];

var DeviceState = [
	'Unknown',
	'Charging',
	'Discharging',
	'Empty',
	'Fully charged',
	'Pending charge',
	'Pending discharge'
];

var Device = module.exports = function(powermgr, device) {
	var self = this;

	self.power = powermgr;
	self.device = device;
	self.methods = powermgr.dbus.get_interface(powermgr.systemBus, 'org.freedesktop.UPower', device, 'org.freedesktop.UPower.Device');
	self.properties = powermgr.dbus.get_interface(powermgr.systemBus, 'org.freedesktop.UPower', device, 'org.freedesktop.DBus.Properties');

	this.__defineGetter__('powerSupply', function() {
		return self.properties.Get(self.device, 'PowerSupply');
	});

	this.__defineGetter__('type', function() {
		return DeviceType[self.properties.Get(self.device, 'Type')];
	});

	this.__defineGetter__('percentage', function() {
		return self.properties.Get(self.device, 'Percentage');
	});

	this.__defineGetter__('state', function() {
		return DeviceState[self.properties.Get(self.device, 'State')];
	});

	this.__defineGetter__('timeToFull', function() {
		return self.properties.Get(self.device, 'TimeToFull');
	});

	this.__defineGetter__('timeToEmpty', function() {
		return self.properties.Get(self.device, 'TimeToEmpty');
	});

	/* Signal */
	this.onPropertyChanged = function(callback) {

		self.methods.Changed.onemit = callback;
		self.methods.Changed.enabled = true;
	};
};
