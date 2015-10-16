var expect = require('expect');
var bitcoinMock = require('../lib/bitcoinMock.js');

var client = new bitcoinMock.Client();

beforeEach(function(done) {
  client.flush();
  done();
});

describe('getBalance', function() {
  it('Should return balance', function(done) {
    client._transactions['a'] = {
      amount: 1.1,
      confirmations: 6,
      details: [{
        account: 'a'
      }]
    };
    client._transactions['b'] = {
      amount: 1.1,
      confirmations: 6,
      details: [{
        account: 'b'
      }]
    };
    client.getBalance('a', 6, function(err, reply) {
      expect(reply).toBe(1.1);
      done();
    });
  });
});

describe('getTransaction', function() {
  it('Should return transaction by txid', function(done) {
    var tr = {
      amount: 1,
      confirmations: 6,
      txid: 'x6obsp82p7sosesy3m3o752czwayajca0ni3swslbtjywg0qk7sddaod03mk4pxh',
      time: 1444951859,
      details: [{
        account: '',
        address: 'mPqm42rauvwUXS522d3ND8SX88XZF99QM3',
        category: 'receive',
        amount: 1,
        fee: 0.002
      }]
    };
    client._transactions[tr.txid] = tr;
    client.getTransaction(tr.txid, function(err, reply) {
      expect(reply).toEqual(tr);
      done();
    });
  });

  it('Should return error if there is no such transaction', function(done) {
    client.getTransaction('a', function(err, reply) {
      expect(err.message).toBe('Invalid or non-wallet transaction id');
      done();
    });
  });
});

describe('getBlock', function() {
  it('Should return block by blockid', function(done) {
    var block = {
      hash: 'x6obsp82p7sosesy3m3o752czwayajca0ni3swslbtjywg0qk7sddaod03mk4pxh',
      confirmations: 6,
      size: 100,
      height: 1,
      version: 1,
      merkleroot: 'x6obsp82p7sosesy3m3o752czwayajca0ni3swslbtjywg0qk7sddaod03mk4pxh',
      tx: [
        'x6obsp82p7sosesy3m3o752czwayajca0ni3swslbtjywg0qk7sddaod03mk4pxh'
      ],
      time: 1444951859,
      nonce: 1924588547,
      bits: '1d00ffff',
      difficulty: 1.00000000,
      chainwork: 'x6obsp82p7sosesy3m3o752czwayajca0ni3swslbtjywg0qk7sddaod03mk4pxh',
      previousblockhash: 'x6obsp82p7sosesy3m3o752czwayajca0ni3swslbtjywg0qk7sddaod03mk4pxh',
      nextblockhash: 'x6obsp82p7sosesy3m3o752czwayajca0ni3swslbtjywg0qk7sddaod03mk4pxh'
    };;
    client._blocks[block.hash] = block;
    client.getBlock(block.hash, function(err, reply) {
      expect(reply).toEqual(block);
      done();
    });
  });

  it('Should return error if there is no such block', function(done) {
    client.getBlock('a', function(err, reply) {
      expect(err.message).toBe('Block not found');
      done();
    });
  });
});

describe('importPrivKey', function() {
  it('Should import private key', function(done) {
    client.importPrivKey('KxiLb4ft6AZEk1RzJ9U35Cw7N4ACHcYrBhYKWhGTrUgT2pnjQ78q',
      function(err, reply) {
        expect(client._accounts.n1ELtMuckRN5DYLPJg25UHcPaC2wg4eMmy.privKey)
          .toBe('KxiLb4ft6AZEk1RzJ9U35Cw7N4ACHcYrBhYKWhGTrUgT2pnjQ78q');
        done();
      }
    );
  });
});

describe('setAccount', function() {
  it('Should set account for key', function(done) {
    client._accounts.n1ELtMuckRN5DYLPJg25UHcPaC2wg4eMmy = {
      account: '',
      privKey: 'KxiLb4ft6AZEk1RzJ9U35Cw7N4ACHcYrBhYKWhGTrUgT2pnjQ78q'
    };
    client.setAccount('n1ELtMuckRN5DYLPJg25UHcPaC2wg4eMmy', 'a',
      function(err, reply) {
        expect(client._accounts.n1ELtMuckRN5DYLPJg25UHcPaC2wg4eMmy.account)
          .toBe('a');
        done();
      }
    );
  });

  it('Should return error if there is no such address', function(done) {
    client.setAccount('a', 'b', function(err, reply) {
      expect(err.message).toBe('setaccount can only be used with own address');
      done();
    });
  });
});

describe('cmd', function() {
  it('Should work with commands', function(done) {
    client.cmd('importprivkey', 'KxiLb4ft6AZEk1RzJ9U35Cw7N4ACHcYrBhYKWhGTrUgT2pnjQ78q',
      function(err, reply) {
        expect(client._accounts.n1ELtMuckRN5DYLPJg25UHcPaC2wg4eMmy).toExist();
        done();
      }
    );
  });
  
  it('Should work with batch', function(done) {
    client.cmd([{
      method: 'importprivkey',
      params: ['KxiLb4ft6AZEk1RzJ9U35Cw7N4ACHcYrBhYKWhGTrUgT2pnjQ78q']
    },
    {
      method: 'setaccount',
      params: ['n1ELtMuckRN5DYLPJg25UHcPaC2wg4eMmy', 'a']
    }]);
    expect(client._accounts.n1ELtMuckRN5DYLPJg25UHcPaC2wg4eMmy).toExist();
    expect(client._accounts.n1ELtMuckRN5DYLPJg25UHcPaC2wg4eMmy.account).toBe('a');
    done();
  });
});

describe('pushTransaction', function() {
  it('Should push transaction', function(done) {
    client.pushTransaction('', 6, 'receive', 1);
    expect(Object.keys(client._transactions)).toNotEqual([]);
    done();
  });
});

describe('pushBlock', function() {
  it('Should push block', function(done) {
    client.pushBlock(6)
    expect(client._blocks).toNotEqual({});
    done();
  });
});

describe('flush', function() {
  it('Should flush everything', function(done) {
    client._blocks.a = 'a';
    client._transactions.a = 'a';
    client._accounts.a = 'a';
    client.flush();
    expect(client._blocks).toEqual({});
    expect(client._transactions).toEqual({});
    expect(client._accounts).toEqual({});
    done();
  });
});
