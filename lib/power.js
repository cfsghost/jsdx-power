"use strict";

var DBus = require('dbus');
var async = require('async');

var Battery = require('./battery');
var Define = require('./define');

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

Power.prototype.onBattery = function(callback) {
	var self = this;

	self.upower.getProperty('OnBattery', function(value) {
		if (callback)
			callback(null, value);
	});
};

Power.prototype.listDevices = function(callback) {
	var self = this;

	if (!callback)
		throw Error('listDevices method requires a parameter for callback function');

	self.upower.EnumerateDevices['finish'] = function(devices) {
		callback(null, devices);
	};
	self.upower.EnumerateDevices['timeout'] = 10000;
	self.upower.EnumerateDevices();
};

Power.prototype.getBatteries = function(callback) {
	var self = this;

	if (!callback)
		throw Error('getBatteries method requires a parameter for callback function');

	self.listDevices(function(err, devices) {

		if (err) {
			callback(err);
			return;
		}

		var batts = [];
		async.eachSeries(devices, function(objectPath, next) {

			if (objectPath.search('/org/freedesktop/UPower/devices/battery') == 0) {
				var batt = new Battery(self, objectPath);
				batt.init(function() {

					batts.push(batt);

					next();
				});
			} else {
				next();
			}
		}, function() {

			callback(null, batts);
		});
	});
};

Power.prototype.getBattery = function(batteryName, callback) {
	var self = this;

	if (!callback)
		throw Error('getBatteries method requires a parameter for callback function');

	var targetPath;
	if (batteryName)
		targetPath = '/org/freedesktop/UPower/devices/' + batteryName;
	else
		targetPath = '/org/freedesktop/UPower/devices/battery';

	self.listDevices(function(err, devices) {

		if (err) {
			callback(err);
			return;
		}

		async.eachSeries(devices, function(objectPath, next) {

			if (objectPath.search(targetPath) == 0) {

				var batt = new Battery(self, objectPath);
				batt.init(function() {

					next(batt);
				});

			} else {
				next();
			}
		}, function(batt) {

			callback(null, batt);
		});
	});
};

Power.Define = Define;
