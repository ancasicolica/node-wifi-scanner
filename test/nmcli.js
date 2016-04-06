/**
 * nmcli unit test
 * Created by kc on 04.04.16.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const nmcli = require('../lib/nmcli');

describe.skip('nmcli', () => {
  it('parses the output of file 1', function(done) {
    nmcli.parseOutput(fs.readFileSync(path.join(__dirname, 'fixtures','nmcli','nmcli01.txt'), { encoding: 'utf8' }), (err, info) => {

      console.log(info);
      assert.ok(info);
      assert.equal(info.length, 19);

      var ap = info[0];
      assert.equal(ap.mac, '00:35:1A:90:56:06');
      assert.equal(ap.ssid, 'PDANet1');
      //assert.equal(ap.rssi, -70);
      assert.strictEqual(ap.channel, 112);

      done(err);
    });
  });

});