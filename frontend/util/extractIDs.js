// Simple command line utility that extracts IDs from the file whose name
// and path is passed in

var fs = require('fs');
if (process. argv. length <= 2) {
  console. log('Usage: ' + __filename + ' path_to_json');
  process. exit(-1);
}

var param = process.argv[2];

var data = JSON.parse(fs.readFileSync(param, 'utf8'));
console.log('mockIDs = [');
for (var i = 0; i < data.length; i++) {
  if (i == data.length - 1) {
    console.log('\"' + data[i].id + '\"');
  } else {
    console.log('\"' + data[i].id + '\",');
  }
}

console.log('];');
