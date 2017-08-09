function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

function showPosition(position) {
  $('#latLoc').val(position.coords.latitude);
  $('#longLoc').val(position.coords.longitude);
}

getLocation();
