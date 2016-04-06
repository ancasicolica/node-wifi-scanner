/**
 * iwlist tests
 * Created by kc on 05.04.16.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const iwlist = require('../lib/iwlist');

describe('iwlist', () => {
  it('parses the output of file 1', function(done) {
    iwlist.parseOutput(fs.readFileSync(path.join(__dirname, 'fixtures','iwlist','iwlist01_ubuntu1404.txt'), { encoding: 'utf8' }), (err, info) => {
      assert.ok(info);
      done(err);
    });
  });

  it('parses the output of file 2', function(done) {
    iwlist.parseOutput(fs.readFileSync(path.join(__dirname, 'fixtures','iwlist','iwlist02_raspi.txt'), { encoding: 'utf8' }), (err, info) => {

      assert.ok(info);

      var ap = info[0];
      assert.equal(ap.mac, 'D4:D1:84:50:76:45');
      assert.equal(ap.ssid, 'gsy-97796');
      assert.equal(ap.rssi, -76);
      assert.strictEqual(ap.channel, 6);

      ap = info[2];
      assert.equal(ap.mac, '7C:B7:33:AE:3B:05');
      assert.equal(ap.ssid, 'visitor-18170');
      assert.equal(ap.rssi, -70);
      assert.strictEqual(ap.channel, 9);
      done(err);
    });
  });
  it('parses the output of file 2', function(done) {
    iwlist.parseOutput(fs.readFileSync(path.join(__dirname, 'fixtures','iwlist','iwlist03_raspi.txt'), { encoding: 'utf8' }), (err, info) => {
      assert.ok(info);
      
      var ap = info[0];
      assert.equal(ap.mac, '00:35:1A:90:56:00');
      assert.equal(ap.ssid, 'LORA-Wifi');
      assert.equal(ap.rssi, -71);
      assert.strictEqual(ap.channel, 1);

      ap = info[28];
      assert.equal(ap.mac, '00:35:1A:5B:45:B2');
      assert.equal(ap.ssid, '');
      assert.equal(ap.rssi, -89);
      assert.strictEqual(ap.channel, 11);
      done(err);
    });
  });

});