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

      console.log(info);
      assert.ok(info);
      done(err);
    });
  });

  it('parses the output of file 2', function(done) {
    iwlist.parseOutput(fs.readFileSync(path.join(__dirname, 'fixtures','iwlist','iwlist02_raspi.txt'), { encoding: 'utf8' }), (err, info) => {

      console.log(info);
      assert.ok(info);
      done(err);
    });
  });

});