/**
 * Scanning WiFis on Mac OS X
 * Created by kc on 04.04.16.
 */

const tool     = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport';
const cmdLine  = tool + ' -s';
const detector = tool + ' -getInfo';

const macRegex = /([0-9a-zA-Z]{1}[0-9a-zA-Z]{1}[:]{1}){5}[0-9a-zA-Z]{1}[0-9a-zA-Z]{1}/;

/**
 * Parsing the output of airport (Mac OS X)
 * @param str output of the tool
 * @param callback
 */
function parseOutput(str, callback) {
  let err   = null;
  let wifis = [];

  try {
    let lines = str.split('\n');

    for (let i = 1, l = lines.length; i < l; i++) {
      let mac = lines[i].match(macRegex);
      if (!mac) {
        continue;
      }
      let macStart = lines[i].indexOf(mac[0]);
      let elements = lines[i].substr(macStart).split(/[ ]+/);
      wifis.push({
        'ssid'   : lines[i].substr(0, macStart).trim(),
        'mac'    : elements[0].trim(),
        'channel': parseInt(elements[2].trim(), 10),
        'rssi'   : parseInt(elements[1].trim(), 10)
      });
    }
  }
  catch (ex) {
    err = ex;
  }
  finally {
    callback(err, wifis);
  }
}


module.exports = {
  parseOutput: parseOutput,
  cmdLine    : cmdLine,
  detector   : detector,
  tool       : tool
};
