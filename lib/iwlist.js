/**
 * iwlist - a powerful tool with a horrible output
 * Created by kc on 04.04.16.
 */

const _       = require('lodash');
const tool    = '/usr/bin/iwlist';
const cmdLine = tool + ' scan';

const macRegex  = /([0-9a-zA-Z]{1}[0-9a-zA-Z]{1}[:]{1}){5}[0-9a-zA-Z]{1}[0-9a-zA-Z]{1}/;
const cellRegex = /Cell [0-9]{2,} - Address:/;
/**
 * Parsing the output of iwlist, tool having a lot of different faces :-(
 * @param str output of the tool
 * @param callback
 */
function parseOutput(str, callback) {
  var err   = null;
  var wifis = [];

  try {
    var blocks = str.split(cellRegex);

    blocks.forEach(block => {
      var network = {};
      var lines   = block.split('\n');
      if (macRegex.exec(lines[0])) {
        // First line is the mac address (always! (?))
        network.mac = lines[0].trim();

        lines.forEach(line => {
          // SSID
          if (line.indexOf('ESSID:') > 0) {
            network.ssid = _.trim(line.split(':')[1], '"');
            if (_.startsWith(network.ssid, '\\x00')) {
              // The raspi 3 interprets a string terminator as character, it's an empty SSID
              network.ssid = '';
            }
          }

          // Channel, an ugly thing to get it
          else if (_.startsWith(line.trim(), 'Frequency:')) {
            network.channel = parseInt(_.trim(line, ' )').split(/Channel/)[1], 10);
          }
            
          // Another ugly thing, the signal which can have different formats, even worse als
          // having different identifiers
          else if (line.indexOf('Signal level') > -1) {
            if (line.indexOf('Quality') > -1) {
              // This is a "Quality=40/70  Signal level=-70 dBm" line
              network.rssi = parseInt(line.substr(line.indexOf('Signal level') + 13), 10);
            }
            else {
              // This is a "Signal level=60/100" line
              var elements = line.split('=');
              elements.forEach(e => {
                if (e.indexOf('/') > 0) {
                  // that's our part
                  var parts    = e.split('/');
                  var level    = Math.floor(100 * parseInt(parts[0], 10) / parseInt(parts[1], 10));
                  network.rssi = level / 2 - 100;
                }
              })
            }
          }
        });
        wifis.push(network);
      }
    });
  }
  catch (ex) {
    err = ex;
  }

  callback(err, wifis);
}


module.exports = {
  parseOutput: parseOutput,
  cmdLine    : cmdLine,
  tool       : tool
};
