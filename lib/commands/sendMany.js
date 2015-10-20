var async = require('async');
var Big = require('big.js');

module.exports = function(client) {
  client.sendMany = client.sendmany = function(account, many, callback) {
    var details = [];
    var totalAmount = 0;
    var totalFee = 0;
    async.forEachOf(many, function(amount, addr, cb) {
      details.push({
        account: '',
        address: addr,
        category: 'send',
        amount: amount,
        vout: 0,
        fee: -0.0002
      });
      totalFee = Big(totalFee).minus(0.0002).toFixed(8);
      totalAmount = Big(totalAmount).minus(amount).toFixed(8);
      cb(null);
    }, function() {
      var txid = client.generateHash(64);
      client._transactions[txid] = {
        amount: parseFloat(totalAmount),
        fee: parseFloat(totalFee),
        confirmations: 6,
        txid: txid,
        walletconflicts: [],
        time: Date.now() / 1000 | 0,
        timereceived: Date.now() / 1000 | 0,
        details: details,
        hex: client.generateHash(520)
      };
      callback(null, txid);
    });
  };
};
