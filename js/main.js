var updateTime = function() {
  var currentTime = moment().format('h:mm.ss');
  $('.time h1').text(currentTime);
}

$(document).ready(function() {
  updateTime();
  setInterval(function() {
    updateTime();
  }, 1000);
});
