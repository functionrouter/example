function get(id, path) {
  var fs = require('fs');
  var data = JSON.parse(fs.readFileSync(path + '/MOCK_DATA.json', 'utf8'));
  var retval;

  for (var i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      retval = data[i];
      i = data.length;
    }
  }

  return retval;
}

module.exports = {
  get: get,
};
