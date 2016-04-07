/**
 * Scanning WiFis on Windows
 * Created by kc on 04.04.16.
 */

const systemRoot = process.env.SystemRoot || 'C:\\Windows';
const tool       = systemRoot + '\\System32\\netsh.exe';
const cmdLine    = tool + ' wlan show networks mode=Bssid';

/**
 * Parsing netnsh output. Unfortunately netsh supplies the network information
 * in the language of the operating system. Translating the terms into every
 * language supplied is not possible, therefore this implementation follows
 * an approach of analyzing the structure of the output
 */
function parseOutput(str, callback) {
  var blocks = str.split('\n\n');
  var wifis  = [];
  var err    = null;
  try {
    if (blocks.length < 2) {
      // 2nd try, with \r\n
      blocks = str.split('\r\n\r\n')
    }
    if (!blocks || blocks.length === 1) {
      // No WiFis found
      return callback(null, []);
    }

    // Each block has the same structure, while some parts might be available and others
    // not. A sample structure:
    // SSID 1 : AP-Test1
    //     Network type              : Infrastructure
    //     Authentication            : WPA2-Personal
    //     Encryption                : CCMP
    //     BSSID 1                   : 00:aa:f2:77:a5:53
    //          Signal               : 46%
    //          Radio type           : 802.11n
    //          Channel              : 6
    //          Basic rates (MBit/s) : 1 2 5.5 11
    //          Other rates (MBit/s) : 6 9 12 18 24 36 48 54
    for (var i = 1, l = blocks.length; i < l; i++) {
      var network      = {};
      var lines        = blocks[i].split('\n');
      var regexChannel = /[a-zA-Z0-9()\s]+:[\s]*[0-9]+$/g;
      if (!lines || lines.length < 2) {
        continue;
      }

      // First line is always the SSID (which can be empty)
      var ssid = lines[0].substring(lines[0].indexOf(':') + 1).trim();

      for (var t = 1, n = lines.length; t < n; t++) {
        if (lines[t].split(':').length === 7) {
          // This is the mac address, use this one as trigger for a new network
          if (network.mac) {
            wifis.push(network);
          }
          network = {
            ssid: ssid,
            mac : lines[t].substring(lines[t].indexOf(':') + 1).trim()
          };
        }
        else if (lines[t].indexOf('%') > 0) {
          // Network signal strength, identified by '%'
          var level = parseInt(lines[t].split(':')[1].split('%')[0].trim(), 10);

          network.rssi = (level / 2) - 100;
        }
        else if (!network.channel) {
          // A tricky one: the channel is the first one having just ONE number. Set only
          // if the channel is not already set ("Basic Rates" can be a single number also)
          if (regexChannel.exec(lines[t].trim())) {
            network.channel = parseInt(lines[t].split(':')[1].trim());
          }
        }
      }
      if (network) {
        wifis.push(network);
      }
    }
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
