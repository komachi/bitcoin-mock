module.exports = function(client) {
  client.pushBlock = function(conf, txs) {
    var blockid = client.generateHash();
    client._blocks[blockid] = {
      hash: blockid,
      confirmations: conf,
      size: 100,
      height: Object.keys(client._blocks).length,
      version: 1,
      merkleroot: client.generateHash(),
      tx: txs || [client.generateHash()],
      time: Date.now() / 1000 | 0,
      nonce: 1924588547,
      bits: '1d00ffff',
      difficulty: 1.00000000,
      chainwork: client.generateHash(),
      previousblockhash: client.generateHash(),
      nextblockhash: client.generateHash()
    };
  };
};
