module.exports = function(client) {
  client.pushBlock = function(conf, txs) {
    var blockid = client.generateHash(64);
    client._blocks[blockid] = {
      hash: blockid,
      confirmations: conf,
      size: 100,
      height: Object.keys(client._blocks).length,
      version: 1,
      merkleroot: client.generateHash(64),
      tx: txs || [client.generateHash(64)],
      time: Date.now() / 1000 | 0,
      nonce: 1924588547,
      bits: '1d00ffff',
      difficulty: 1.00000000,
      chainwork: client.generateHash(64),
      previousblockhash: client.generateHash(64),
      nextblockhash: client.generateHash(64)
    };
  };
};
