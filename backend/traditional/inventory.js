var mockdata = require('./mockdata');

module.exports.get = (event, context, callback) => {

  // See https://stackoverflow.com/questions/35190615/api-gateway-cors-no-access-control-allow-origin-header
  // API Gateway won't insert the 'Access-Control-Allow-Origin' but you can do it
  // Yourself manually here in the Lambda function
  const response = {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin' : '*' },
    body: JSON.stringify(mockdata.get(event.pathParameters.id, '.')),
  };
  callback(null, response);
};
