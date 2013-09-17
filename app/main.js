global.$ = $;

var abar = require('./lib/address_bar');
var folder_view = require('./lib/folder_view');
var path = require('path');
var shell = require('nw.gui').Shell;

$(document).ready(function() {
  var folder = new folder_view.Folder($('#files'));
  var addressbar = new abar.AddressBar($('#addressbar'));

  folder.open('/yaniv/stor');
  addressbar.set('/yaniv/stor');

  folder.on('navigate', function(dir, type) {

    if (type == 'folder') {
      addressbar.enter(dir, type);
    } else {
      window.alert(dir, type);
    }
  });

  addressbar.on('navigate', function(dir) {
    folder.open(dir);
  });
});
