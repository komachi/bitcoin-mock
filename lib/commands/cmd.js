var async = require('async');

module.exports = function(client) {
  client.cmd = function() {
    var args = [].slice.call(arguments);
    if (Array.isArray(args[0])) {
      var cb;
      var fn = args[args.length-1];
      if (typeof fn === 'function') {
        cb = fn;
        args.pop();
      } else {
        cb = function() {};
      }
      
      var tasks = [];
      async.each(args[0], function(cmd, callback) {
        tasks.push(function(callback) {
          cmd.params.push(callback);
          client[cmd.method].apply(this, cmd.params);
        });
        callback(null);
      }, function() {
        async.series(tasks, cb);
      });

    } else {
      var command = args[0];
      args.shift();
      client[command].apply(this, args);
    }
  };
};
