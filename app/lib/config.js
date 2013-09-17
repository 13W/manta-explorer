/*************************************************************************************************
	DO NOT MODIFY THIS FILE UNLESS YOU REALLY REALLY REALLY REALLY KNOW WHAT YOU ARE DOING!!!  /k
*************************************************************************************************/
var path = require('path');
var rc = require('rc');
var fs = require('fs');

var defaults = {
	sign: {
		key: null,
		keyId: null,
		user: null
	},
	user: null,
    url: process.env.MANTA_URL || 'https://us-east.manta.joyent.com'
};

function alertAndThrow(msg) {
	window.alert('missing key in config. Either specify the filename in config.keyFile or the whole key in config.sign.key');
	throw new Error(msg);
}

var resolvedConfig = rc('manta-explorer', defaults);

if (resolvedConfig.keyFile) {
	resolvedConfig.sign.key = fs.readFileSync(resolvedConfig.keyFile, 'utf8');
}

if (!resolvedConfig.sign.key) {
	alertAndThrow('missing key in config. Either specify the filename in config.keyFile or the whole key in config.sign.key');
}

if (resolvedConfig.keyId) {
	resolvedConfig.sign.keyId = resolvedConfig.keyId;
} else if (process.env.MANTA_KEY_ID) {
	resolvedConfig.sign.keyId = process.env.MANTA_KEY_ID;
}

if (!resolvedConfig.sign.keyId) {
	alertAndThrow('missing keyId, either specify config.keyId or config.sign.keyId');
}

if (resolvedConfig.user) {
	resolvedConfig.sign.user = resolvedConfig.user;
} else if (process.env.MANTA_USER) {
	resolvedConfig.sign.user = process.env.MANTA_USER;
}

if (!resolvedConfig.sign.user) {
	alertAndThrow('missing user, either specify config.user or config.sign.user');
}

module.exports = resolvedConfig;