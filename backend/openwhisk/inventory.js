function main(params) {
  var id = params.id || '003836230-9'; // Default to the first ID in the file
  var mockdata = require('./mockdata');
  var fs = require('fs');

  // OpenWhisk injects the .zip file representing this function into one
  // randomly named directory and then unzips it into a second.  See:
  // https://github.com/apache/incubator-openwhisk/blob/master/core/nodejsActionBase/runner.js
  //
  // The calling structure here first finds the directory that has the MOCK_DATA.json
  // file and then uses the path to invoke the business logic
  return new Promise(function (resolve, reject) {
      var exec = require('child_process').exec;
      var cmd = 'ls';

      exec(cmd, function (error, stdout, stderr) {
            if (error) {
              reject(error);
            } else {

              var ls = stdout.split('\n');
              var path = '';
              var retval;
              for (var i = 0; i < ls.length; i++) {
                if (ls[i] != 'app.js' &&
                    ls[i] != 'logs' &&
                    ls[i] != 'node_modules' &&
                    ls[i] != 'package.js' &&
                    ls[i] != 'runner.js' &&
                    ls[i] != 'package.json' &&
                    ls[i] != 'src' &&
                    ls[i] != 'test.js' &&
                    ls[i] != '') {
                  console.log('trying: ' + i + ' ' + ls[i]);

                  try {
                    fs.readFileSync('/nodejsAction/' + ls[i] + '/MOCK_DATA.json');
                    path = '/nodejsAction/' + ls[i] + '/MOCK_DATA.json';
                    console.log('found: ' + path);
                    retval = mockdata.get(id, '/nodejsAction/' + ls[i]);
                    i = ls.length;
                  } catch (e) {
                    console.log('error');
                  }
                }
              }

              resolve(retval);
            }
          });
    });
}

exports.handler = main;
