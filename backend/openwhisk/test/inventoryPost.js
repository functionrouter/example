var assert = require('assert');
var mockdata = require('../mockdata');
var fs = require('fs');
var request = require('request');

describe('conducts a random request against an endpoint', function () {
  this.timeout(10000);
  it('execute request', function (done) {
    var data = JSON.parse(fs.readFileSync('./MOCK_DATA.json', 'utf8'));
    var randomMockObject = data[Math.floor(Math.random() * data.length)];
    var path = 'https://' + process.env.OW_IP_ADDRESS + '/api/v1/namespaces/' +
     process.env.OW_NAMESPACE + '/actions/modern-dev-inventory?blocking=true';
    var authData = 'Basic ' + new Buffer(process.env.OW_AUTH_TOKEN).toString('base64');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Ignore certs

    var options = {
        url: path,
        headers: { Authorization: authData },
        json: { id: randomMockObject.id },
    };

    request.post(options, function (err, res, body) {
      if (err) {
        throw new Error('Request call failed: ' + err);
      }

      assert.equal(200, res.statusCode, 'Create Status Code != 200 (' + res.statusCode + ')');
      var result = body.response.result;

      assert.equal(randomMockObject.id, result.id,
        'ID is correct (' + result.id + ')');
      for (var property in result) {
        if (result.hasOwnProperty(property) &&
          result[property] == randomMockObject[property]) {
          assert.equal(randomMockObject[property], result[property], 'Property ' + property +
          ' is correct (' + randomMockObject[property] + ')');
        }
      }

      done();
    });
  });
});
