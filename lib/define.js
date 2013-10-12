"use strict";

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

module.exports = {
	DeviceType: DeviceType,
	DeviceState: DeviceState
};
