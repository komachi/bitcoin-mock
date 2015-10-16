module.exports = function(client) {  
  client.getTransaction = client.gettransaction = function(txid, callback) {
    if (client._transactions[txid]) {
      callback(null, client._transactions[txid]);
    } else {
      var err = new Error('Invalid or non-wallet transaction id');
      err.code = -5;
      callback(err);
    }
  };
};
