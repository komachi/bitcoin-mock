var CoinKey = require('coinkey');
var ci = require('coininfo')
var Big = require('big.js');

module.exports.Client = function() {  
  this.getBalance = this.getbalance = function(account, conf, cb) {
    var balance = 0;
    for (var i in this._transactions) {
      if (
        ((account == '*' || account === '') ||
        this._transactions[i].details[0].account == account) &&
        this._transactions[i].confirmations >= conf
      ) {
        balance = Big(balance).plus(this._transactions[i].amount).toFixed(8);
      }
    }
    cb(null, parseFloat(balance));
  };
  this.getTransaction = this.gettransaction = function(txid, callback) {
    if (this._transactions[txid]) {
      callback(null, this._transactions[txid]);
    } else {
      var err = new Error('Invalid or non-wallet transaction id');
      err.code = -5;
      callback(err);
    }
  };
  
  this.getBlock = this.getblock = function(blockid, callback) {
    if (this._blocks[blockid]) {
      callback(null, this._blocks[blockid]);
    } else {
      var err = new Error('Block not found');
      err.code = -5;
      callback(err);
    }
  };

  this.importPrivKey = this.importprivkey = function(privKey, callback) {
    var key = new CoinKey.fromWif(privKey, ci('BTC-TEST'));
    var addr = key.publicAddress;
    this._accounts[addr] = {
      account: '',
      privKey: privKey
    };
    callback(null);
  };
  
  this.setAccount = this.setaccount = function(addr, account, callback) {
    if (this._accounts[addr]) {
      this._accounts[addr].account = account;
      callback(null, '');
    } else {
      var err = new Error('setaccount can only be used with own address');
      err.code = -1;
      callback(err);
    }
  };

  this.cmd = function() {
    var args = [].slice.call(arguments);
    if (Array.isArray(args[0])) {
      if (typeof args[args.length-1] === 'function') {
        args.pop();
      }
      for (var i in args[0]) {
        args[0][i].params.push(function() {});
        this[args[0][i].method].apply(this, args[0][i].params);
      }
    } else {
      var command = args[0];
      args.shift();
      this[command].apply(this, args);
    }
  };

  this.pushTransaction = function(account, conf, category, amount) {
    var txid = generateHash();
    this._transactions[txid] = {
      amount: amount,
      confirmations: conf,
      txid: txid,
      time: Date.now() / 1000 | 0,
      details: [{
        account: account,
        address: generateAddress(),
        category: category,
        amount: amount,
        fee: 0.002
      }]
    };
  };

  this.pushBlock = function(conf, txs) {
    var blockid = generateHash();
    this._blocks[blockid] = {
      hash: blockid,
      confirmations: conf,
      size: 100,
      height: Object.keys(this._blocks).length,
      version: 1,
      merkleroot: generateHash(),
      tx: txs || [generateHash()],
      time: Date.now() / 1000 | 0,
      nonce: 1924588547,
      bits: '1d00ffff',
      difficulty: 1.00000000,
      chainwork: generateHash(),
      previousblockhash: generateHash(),
      nextblockhash: generateHash()
    };
  };
  
  this.flush = function() {
    this._blocks = {};
    this._transactions = {};
    this._accounts = {};
  };

  this.flush();
  
  function generateHash() {
    var text = '';
    var possible = '1234567890abcdefghijklmnopqrstuvwxyz';

    for ( var i=0; i < 64; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  function generateAddress() {
    var text = '';
    var possible = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

    for( var i=0; i < 33; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return 'm' + text;
  }
};
