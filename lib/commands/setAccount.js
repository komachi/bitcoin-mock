module.exports = function(client) {
  client.setAccount = client.setaccount = function(addr, account, callback) {
    if (client._accounts[addr]) {
      client._accounts[addr].account = account;
      callback(null);
    } else {
      var err = new Error('setaccount can only be used with own address');
      err.code = -1;
      callback(err);
    }
  };
};
