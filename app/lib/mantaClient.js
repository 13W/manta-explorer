var manta = require('manta');
var config = require('./config.js');

console.log(config);

var client = manta.createClient({
    sign: manta.privateKeySigner(config.sign),
    user: config.user,
    url: config.url
});

// console.log('manta ready: %s', client.toString());

// client.on('listening', function() {
//   console.log('manta client listening');
// });

module.exports = client;