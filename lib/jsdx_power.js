/*
 * JSDX Power Manager API
 *
 * Copyright(c) 2012 Fred Chien <fred@mandice.com>
 *
 */

var dbus = require('dbus');
var Device = require('./device');

var Power = module.exports = function() {
};

Power.prototype.init = function(callback) {
	var self = this;

	self.devices = {};
	self.dbus = dbus;

	self.dbus.start(function() {
		self.systemBus = dbus.system_bus();
		self.manager = dbus.get_interface(self.systemBus, 'org.freedesktop.UPower', '/org/freedesktop/UPower', 'org.freedesktop.UPower');
		self.properties = dbus.get_interface(self.systemBus, 'org.freedesktop.UPower', '/org/freedesktop/UPower', 'org.freedesktop.DBus.Properties');

		/* Initializing device list */
		self.listDevices(function(devices) {
			for (var index in devices) {
				var device = devices[index];

				if (!self.devices.hasOwnProperty(devices[index])) {
					self.devices[device] = new Device(self, device);
				}
			}

			callback.apply(self, []);
		});

//		dbus.runListener();
	});

	this.__defineGetter__('canSuspend', function() {
		return self.properties.Get('org.freedesktop.UPower', 'CanSuspend');
	});

	this.__defineGetter__('canHibernate', function() {
		return self.properties.Get('org.freedesktop.UPower', 'CanHibernate');
	});

	this.__defineGetter__('hasBattery', function() {
		for (var index in self.devices) {
			if (self.devices[index].type == 'Battery')
				return true;
		}

		return false;
	});

	this.__defineGetter__('onBattery', function() {
		return self.properties.Get('org.freedesktop.UPower', 'OnBattery');
	});

	this.__defineGetter__('onLowBattery', function() {
		return self.properties.Get('org.freedesktop.UPower', 'OnLowBattery');
	});

	this.__defineGetter__('lidIsClosed', function() {
		return self.properties.Get('org.freedesktop.UPower', 'LidIsClosed');
	});

	this.__defineGetter__('hasLid', function() {
		return self.properties.Get('org.freedesktop.UPower', 'LidIsPresent');
	});

	/* Signal */
	this.onPropertyChanged = function(callback) {

		self.manager.Changed.onemit = callback;
		self.manager.Changed.enabled = true;
	};
};

Power.prototype.listDevices = function(callback) {
	var self = this;

	if (!callback)
		throw Error('listDevices method requires a parameter for callback function');

	callback.apply(self, [
		self.manager.EnumerateDevices()
	]);
};
