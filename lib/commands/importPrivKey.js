var CoinKey = require('coinkey');
var ci = require('coininfo');

module.exports = function(client) {
  client.importPrivKey = client.importprivkey = function(privKey, callback) {
    var key = new CoinKey.fromWif(privKey, ci('BTC-TEST'));
    var addr = key.publicAddress;
    client._accounts[addr] = {
      account: '',
      privKey: privKey
    };
    callback(null);
  };
};
