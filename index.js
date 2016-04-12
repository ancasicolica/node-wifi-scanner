/**
 * node-wifi-scanner
 * Created by kc on 04.04.16.
 */

const fs      = require('fs');
const exec    = require('child_process').exec;
// The tools
const airport = require('./lib/airport');
const iwlist  = require('./lib/iwlist');
const netsh   = require('./lib/netsh');

var scanner;

// Initializing the tools
function initTools(callback) {
  fs.stat(airport.tool, function (err, stats) {
    if (stats) {
      return callback(null, airport);
    }

    fs.stat(iwlist.tool, function (err, stats) {
      if (stats) {
        return callback(null, iwlist);
      }
      fs.stat(netsh.tool, function (err, stats) {
        if (stats) {
          return callback(null, netsh);
        }
        callback(new Error('No scanner found'));
      });
    });
  });
}

function scanNetworks(callback) {
  exec(scanner.cmdLine, function (err, stdout) {
    if (err) {
      callback(err, null);
      return;
    }
    scanner.parseOutput(stdout, callback);
  });
}

module.exports = {
  /**
   * Scan for wifis
   * @param callback
   */
  scan: function (callback) {
    if (!scanner) {
      initTools((err, s) => {
        if (err) {
          return callback(err);
        }
        scanner = s;
        scanNetworks(callback);
      });
      return;
    }
    scanNetworks(callback);
  }
};