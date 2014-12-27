//
//  ---------------------------------------------------
//   Welcome to the 'Better New Tab' Chrome Extension!
//  ---------------------------------------------------
//
//   Created by Kyle Chadha
//   www.kylechadha.com
//   @kylechadha
//


var updateTime = function() {
  var currentTime = moment().format('h:mm.ss');
  $('.time h1').text(currentTime);
}

var extensionData = localStorage.getItem('newtab_extension') ? JSON.parse(localStorage.getItem('newtab_extension')) : {};

var updateText = function(item) {
  var selector = '.manifesto__' + item;

  extensionData[item] = $(selector).html();
  localStorage.setItem('newtab_extension', JSON.stringify(extensionData));
}


$(document).ready(function() {

  // Update the current time.
  updateTime();
  setInterval(function() {
    updateTime();
  }, 1000);

  // If available in localStorage, set the header and the body text.
  if (extensionData.header) {
    $('.manifesto__header').html(extensionData.header);
  }
  if (extensionData.text) {
    $('.manifesto__text').html(extensionData.text);
  }

  // Add listeners for the content editable sections.
  $('.manifesto__header').on('blur', function() {
    updateText('header');
  });

  $('.manifesto__text').on('blur', function() {
    updateText('text');
  });

});
