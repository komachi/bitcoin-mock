module.exports = function(client) {
  client.pushTransaction = function(account, conf, category, amount) {
    var txid = client.generateHash(64);
    client._transactions[txid] = {
      amount: amount,
      confirmations: conf,
      txid: txid,
      walletconflicts: [],
      time: Date.now() / 1000 | 0,
      timereceived: Date.now() / 1000 | 0,
      details: [{
        account: account,
        address: client.generateAddress(),
        category: category,
        amount: amount,
        vout: 0
      }],
      hex: client.generateHash(520)
    };
    if (category == 'send') {
      client._transactions[txid].details[0].fee = -0.002;
    }
  };
};
