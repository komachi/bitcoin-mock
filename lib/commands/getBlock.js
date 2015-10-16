module.exports = function(client) {
  client.getBlock = client.getblock = function(blockid, callback) {
    if (client._blocks[blockid]) {
      callback(null, client._blocks[blockid]);
    } else {
      var err = new Error('Block not found');
      err.code = -5;
      callback(err);
    }
  };
};
