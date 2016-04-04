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
      assert.equal(info.length, 36);



      done(err);
    });
  });

});