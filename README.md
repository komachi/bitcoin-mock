# bitcoin-mock

A simple nodejs library for mocking [bitcoin](https://npmjs.com/package/bitcoin).

## Usage

```js
var bitcoinMock = require('bitcoin-mock');
var client = new bitcoinMock.Client();

client.getBalance('*', 6, function(err, reply) {
  console.log(reply); // 0
});
```

## Supported commands

* getbalance
* gettransaction
* getblock
* importprivkey
* setaccount

## Additional commands

* pushTransactions(account, confirmations, category, amount)

Creates a new transaction.

* pushBlock(confirmations, [txids])

Creates a new block.

* flush()

Flush everything

## What missing

* All unsupported commands
* client.cmd doesn't support callbacks
