var requireDir = require('require-dir');
var commands = requireDir('./commands');

module.exports.Client = function() {
  for (var i in commands) {
    commands[i](this);
  }
  
  this.flush = function() {
    this._blocks = {};
    this._transactions = {};
    this._accounts = {};
  };

  this.flush();
  
  this.generateHash = function() {
    var text = '';
    var possible = '1234567890abcdefghijklmnopqrstuvwxyz';

    for ( var i=0; i < 64; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  };

  this.generateAddress = function() {
    var text = '';
    var possible = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

    for( var i=0; i < 33; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return 'm' + text;
  };
};
