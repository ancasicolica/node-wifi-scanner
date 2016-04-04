/**
 * Airport unit test
 * Created by kc on 04.04.16.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const airport = require('../lib/airport');

describe('airport', () => {
  it('parses the output of file 1', function(done) {
    airport.parseOutput(fs.readFileSync(path.join(__dirname, 'fixtures','airport','airport01.txt'), { encoding: 'utf8' }), (err, info) => {

      assert.ok(info);
      assert.equal(info.length, 36);

      var ap = info[0];
      assert.equal(ap.mac, '00:35:1a:90:56:03');
      assert.equal(ap.ssid, 'OurTest');
      assert.equal(ap.rssi, -70);
      assert.strictEqual(ap.channel, 112);

      ap = info[19];
      assert.equal(ap.mac, '00:35:1a:5b:45:b6');
      assert.equal(ap.ssid, 'PDANet1');
      assert.equal(ap.rssi, -78);
      assert.strictEqual(ap.channel, 11);

      ap = info[25];
      assert.equal(ap.mac, '10:bd:18:ab:4d:8f');
      assert.equal(ap.ssid, 'TEST Training');
      assert.equal(ap.rssi, -71);
      assert.strictEqual(ap.channel, 6);

      ap = info[35];
      assert.equal(ap.mac, '00:35:1a:90:56:00');
      assert.equal(ap.ssid, 'TEST-Wifi');
      assert.equal(ap.rssi, -67);
      assert.strictEqual(ap.channel, 1);

      done(err);
    });
  });

  it('parses the output of file 2', function(done) {
    airport.parseOutput(fs.readFileSync(path.join(__dirname, 'fixtures','airport','airport02.txt'), { encoding: 'utf8' }), (err, info) => {
      assert.ok(info);
      assert.equal(info.length, 4);

      var ap = info[0];
      assert.equal(ap.mac, '7c:b7:33:ae:3b:06');
      assert.equal(ap.ssid, 'Raupo');
      assert.equal(ap.rssi, -80);
      assert.strictEqual(ap.channel, 64);

      ap = info[3];
      assert.equal(ap.mac, '7c:b7:33:ae:3b:04');
      assert.equal(ap.ssid, 'Visitor Raupo');
      assert.equal(ap.rssi, -66);
      assert.strictEqual(ap.channel, 9);

      done(err);
    });
  });
});