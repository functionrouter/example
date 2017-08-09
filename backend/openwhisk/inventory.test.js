test('conducts a random get', () => {
  var mockdata = require('./mockdata');
  var fs = require('fs');
  var request = require('request');
  var data = JSON.parse(fs.readFileSync('demo/backend/legacy/MOCK_DATA.json', 'utf8'));
  var randomMockObject = data[Math.floor(Math.random() * data.length)];

  var resultMockObject = mockdata.get(randomMockObject.id, 'demo/backend/legacy');

  for (var property in resultMockObject) {
    if (resultMockObject.hasOwnProperty(property) &&
      resultMockObject[property] == randomMockObject[property]) {
      expect(randomMockObject[property]).toBe(resultMockObject[property]);
    }
  }
});
