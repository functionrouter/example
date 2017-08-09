var assert = require('assert');
var mockdata = require('../mockdata');
var fs = require('fs');
var request = require('request');

describe('conducts a random get against an endpoint', function () {
  this.timeout(5000);
  it('execute get', function (done) {
    var data = JSON.parse(fs.readFileSync('./MOCK_DATA.json', 'utf8'));
    var randomMockObject = data[Math.floor(Math.random() * data.length)];
    var path = 'https://' + process.env.LOCATION_ENDPOINT + '/inventory/' + randomMockObject.id;

    request.get(path, function (err, res, body) {
      if (err) {
        throw new Error('Get call failed: ' + err);
      }

      assert.equal(200, res.statusCode, 'Create Status Code != 200 (' + res.statusCode + ')');
      var bodyJSON = JSON.parse(body);

      assert.equal(randomMockObject.id, bodyJSON.id, 'ID is correct (' + bodyJSON.id + ')');
      for (var property in bodyJSON) {
        if (bodyJSON.hasOwnProperty(property) &&
          bodyJSON[property] == randomMockObject[property]) {
          assert.equal(randomMockObject[property], bodyJSON[property], 'Property ' + property +
          ' is correct (' + randomMockObject[property] + ')');
        }
      }

      done();
    });
  });
});
