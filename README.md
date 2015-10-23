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
* sendmany
* sendtoaddress

## Additional commands

* pushTransaction(account, confirmations, category, amount)

Creates a new transaction.

* pushBlock(confirmations, [txids])

Creates a new block.

* flush()

Flush everything.

* _transactions, _blocks, _accounts

Objects used to store information. By quering them you can check if your code works as expected.

## What's missing

* All unsupported commands
* Some commands don't support optional parameters
