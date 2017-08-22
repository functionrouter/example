function get(fieldID) {
  return document.getElementById(fieldID).value;
}

function set(fieldID, val) {
  document.getElementById(fieldID).value = val;
}

function lookup() {
  if (!get('serviceID') || get('serviceID').value % 2 === 0) {
    set('eeAuthToken', '');
    set('eeURL', 'https://3edzjqlej2.execute-api.us-west-1.amazonaws.com/demo/inventory/');
  } else {
    let lookupEndpoint = get('cfrEndpoint');
    const serviceID = get('serviceID');
    if (lookupEndpoint.slice(-1) !==  '/') {
      lookupEndpoint += '/';
    }
    lookupEndpoint += serviceID + '/';
    lookupEndpoint += get('functionName') + '?latitude=';
    lookupEndpoint += encodeURIComponent(get('latLoc')) + '&longitude=';
    lookupEndpoint += encodeURIComponent(get('longLoc')) + '&accessToken=';
    lookupEndpoint += encodeURIComponent(get('clientID'));

	var date1 = new Date();
    $.ajax({
      type: 'GET',
      url: lookupEndpoint,
      crossDomain: true,
      dataType: 'json',
      success: function (response) {
		var date2 = new Date();
		console.log('Response: ' + JSON.stringify(response, null, 2));
        console.log('Time: ' + (date2 - date1) + ' ms');
        set('eeAuthToken', response.auth);
        set('eeURL', response.url);
		document.getElementById('eeTime').innerHTML = (date2 - date1) + ' ms';
      }
    });
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
  if (!get('eeAuthToken'))
    lookup();

  var path  =  get('eeURL');

  console.log('Function Router: ' + path);
  if (path.indexOf('amazonaws') !== -1) {
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
  } else if (path !='') {
    var date1 = new Date();
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
        var date2 = new Date();
        console.log('Response: ' + JSON.stringify(response.response.result, null, 2));
        console.log('Time: ' + (date2 - date1) + ' ms');
        document.getElementById('eeOutput').innerHTML =
          JSON.stringify(reorderJson(response.response.result), null, 2);
        document.getElementById('eeTime').innerHTML = (date2 - date1) + ' ms';
      },
      failure: function (error) {
        console.log('Fail: ' + error);
      },
    });
  } else {
	console.log('hello world');
  }
});
