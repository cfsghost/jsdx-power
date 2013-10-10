"use strict";

var DBus = require('dbus');

var dbus = new DBus();

var Power = module.exports = function() {
	var self = this;

	self.dbus = dbus;
	self.systemBus = null;
	self.upower = null;
};

Power.prototype.init = function(callback) {
	var self = this;

	self.systemBus = dbus.getBus('system');
	self.systemBus.getInterface(
		'org.freedesktop.UPower',
		'/org/freedesktop/UPower',
		'org.freedesktop.UPower',
		function(err, iface) {
			if (err) {
				if (callback)
					callback(err);
				return;
			}

			self.upower = iface;

			if (callback)
				callback(null);
		});
};

Power.prototype.isDocked = function(callback) {
	var self = this;

	self.upower.getProperty('IsDocked', function(value) {
		if (callback)
			callback(null, value);
	});
};

Power.prototype.hasLid = function(callback) {
	var self = this;

	self.upower.getProperty('LidIsPresent', function(value) {
		if (callback)
			callback(null, value);
	});
};

Power.prototype.isLidClosed = function(callback) {
	var self = this;

	self.upower.getProperty('LidIsClosed', function(value) {
		if (callback)
			callback(null, value);
	});
};
