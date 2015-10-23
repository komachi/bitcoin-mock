module.exports = function(client) {
  client.sendToAddress = client.sendtoaddress = function(addr, amount, callback) {
    var txid = client.generateHash(64);
    client._transactions[txid] = {
      amount: parseFloat(amount),
      fee: -0.0002,
      confirmations: 6,
      txid: txid,
      walletconflicts: [],
      time: Date.now() / 1000 | 0,
      timereceived: Date.now() / 1000 | 0,
      details: {
        account: '',
        address: addr,
        category: 'send',
        amount: amount,
        vout: 0,
        fee: -0.0002
      },
      hex: client.generateHash(520)
    };
    callback(null, txid);
  };
};
