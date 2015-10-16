module.exports = function(client) {
  client.pushTransaction = function(account, conf, category, amount) {
    var txid = client.generateHash();
    client._transactions[txid] = {
      amount: amount,
      confirmations: conf,
      txid: txid,
      time: Date.now() / 1000 | 0,
      details: [{
        account: account,
        address: client.generateAddress(),
        category: category,
        amount: amount,
        fee: 0.002
      }]
    };
  };
};
