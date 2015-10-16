var Big = require('big.js');
var async = require('async');

module.exports = function(client) {
  client.getBalance = client.getbalance = function(account, conf, cb) {
    var balance = 0;
    async.forEachOf(client._transactions, function(item, key, callback) {
      if (
        ((account == '*' || account === '') ||
        item.details[0].account == account) &&
        item.confirmations >= conf
      ) {
        balance = Big(balance).plus(item.amount).toFixed(8);
      }
      callback(null);
    }, function() {
      cb(null, parseFloat(balance));
    });   
  };
};
