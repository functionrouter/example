
document.getElementById('idtext').innerHTML = mockIDs[Math.floor(Math.random() * mockIDs.length)];

$('#idtextButton').on('click', function () {
  document.getElementById('idtext').innerHTML = mockIDs[Math.floor(Math.random() * mockIDs.length)];
});
