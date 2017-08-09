$('#tradButton').on('click', function () {
  var path = document.getElementById('tradEndpoint').value +
    document.getElementById('idtext').innerHTML;
  console.log('Traditional: ' + path);
  var date1 = new Date();
  $.ajax({
    type: 'GET',
    url: path,
    success: function (response) {
      var date2 = new Date();
      console.log('Response: ' + JSON.stringify(response, null, 2));
      console.log('Time: ' + (date2 - date1) + ' ms');
      document.getElementById('tradOutput').innerHTML = JSON.stringify(response, null, 2);
      document.getElementById('tradTime').innerHTML = (date2 - date1) + ' ms';
    }
  });
});
