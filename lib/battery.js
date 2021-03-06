"use strict";

var Define = require('./define');

var Battery = module.exports = function(power, objectPath) {
	var self = this;

	self.power = power;
	self.objectPath = objectPath;
	self.iface = null;
};

Battery.prototype.init = function(callback) {
	var self = this;

	self.power.systemBus.getInterface(
		'org.freedesktop.UPower',
		self.objectPath,
		'org.freedesktop.UPower.Device',
		function(err, iface) {
			if (err) {
				if (callback)
					callback(err);
				return;
			}

			self.iface = iface;

			if (callback)
				callback(null);
		});
};

Battery.prototype.getPercentage = function(callback) {
	var self = this;

	self.iface.getProperty('Percentage', function(value) {
		if (callback)
			callback(null, value);
	});
};

Battery.prototype.getType = function(callback) {
	var self = this;

	self.iface.getProperty('Type', function(value) {
		if (callback)
			callback(null, value);
	});
};

Battery.prototype.getState = function(callback) {
	var self = this;

	self.iface.getProperty('State', function(value) {
		if (callback)
			callback(null, value);
	});
};
