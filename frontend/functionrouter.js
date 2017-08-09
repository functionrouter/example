function lookup() {

  if (document.getElementById('serviceID').value == '' ||
    document.getElementById('serviceID').value % 2) {
    document.getElementById('eeAuthToken').value = '';
    document.getElementById('eeURL').value =
    'https://3edzjqlej2.execute-api.us-west-1.amazonaws.com/demo/inventory/';
  } else {
    document.getElementById('eeAuthToken').value = '23bc46b1-71f6-4ed5-8c54-816aa4f8c502:' +
     '123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP';
    // Insert your targeted EE URL here
    document.getElementById('eeURL').value =
    'https://192.168.0.4/api/v1/namespaces/guest/actions/modern-dev-inventory';
  }
}

function makeBaseAuth() {
  var hash = btoa(document.getElementById('eeAuthToken').value);
  return 'Basic ' + hash;
}

function reorderJson(source) {
  var target = {};
  target.id = source.id;
  target.prod_name = source.prod_name;
  target.box_size = source.box_size;
  target.msrp = source.msrp;
  target.stock_qty = source.stock_qty;
  target.company = source.company;
  target.tagline = source.tagline;
  target.origin_address = source.origin_address;
  target.origin_city = source.origin_city;
  target.origin_state = source.origin_state;
  target.contact_email = source.contact_email;
  target.contact_firstname = source.contact_firstname;
  target.contact_lastname = source.contact_lastname;
  return target;
}

$('#functionRouterButton').on('click', function () {
  if (document.getElementById('eeAuthToken').value == '')
    lookup();

  var path  =  document.getElementById('eeURL').value;
  console.log('Function Router: ' + path);
  if (path.indexOf('amazonaws') !== -1) {
    console.log('AWS API Gateway GET');
    path += document.getElementById('idtext').innerHTML;
    var date1 = new Date();
    $.ajax({
      type: 'GET',
      url: path,
      success: function (response) {
        var date2 = new Date();
        console.log('Response: ' + JSON.stringify(response, null, 2));
        console.log('Time: ' + (date2 - date1) + ' ms');
        document.getElementById('eeOutput').innerHTML = JSON.stringify(response, null, 2);
        document.getElementById('eeTime').innerHTML = (date2 - date1) + ' ms';
      }
    });
  } else {
    console.log('OpenWhisk raw POST');
    path  += '?blocking=true';
    var date3 = new Date();
    $.ajax({
      type: 'POST',
      url: path,
      headers: {
          Authorization: makeBaseAuth(),
      },
      contentType: 'application/json',
      dataType: 'json',
      data: '{"id":"' + document.getElementById('idtext').innerHTML + '"}',
      success: function (response) {
        var date4 = new Date();
        console.log('Response: ' + JSON.stringify(response.response.result, null, 2));
        console.log('Time: ' + (date4 - date3) + ' ms');
        document.getElementById('eeOutput').innerHTML =
          JSON.stringify(reorderJson(response.response.result), null, 2);
        document.getElementById('eeTime').innerHTML = (date4 - date3) + ' ms';
      },
      failure: function (error) {
        console.log('Fail: ' + error);
      },
    });
  }
  /*
   */
});
