//
//  --------------------------------------------------------
//   Welcome to the 'Better New Tab Page' Chrome Extension!
//  --------------------------------------------------------
//
//   Created by Kyle Chadha
//   www.kylechadha.com
//   @kylechadha
//


var extensionData = localStorage.getItem('newtab_extension') ? JSON.parse(localStorage.getItem('newtab_extension')) : {},
    timeFormat = extensionData.format ? extensionData.format : 'h:mm.ss',
    timeFormatSwitch = timeFormat == 'h:mm.ss' ? false : true;

var updateText = function(item) {
  var selector = '.manifesto__' + item;

  extensionData[item] = $(selector).html();
  localStorage.setItem('newtab_extension', JSON.stringify(extensionData));
};

var updateTime = function() {
  var currentTime = moment().format(timeFormat);
  $('.time h1').text(currentTime);
};


$(document).ready(function() {

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
  $('.manifesto__header').on('click', function() {
    $('.edit-instructions').remove();
  });

  $('.manifesto__text').on('blur', function() {
    updateText('text');
  });
  $('.manifesto__text').on('click', function() {
    $('.edit-instructions').remove();
  });

  // Update the current time.
  updateTime();
  setInterval(function() {
    updateTime();
  }, 1000);

  // Add click listener for time format selection.
  $('.time h1').on('click', function() {
    timeFormat = timeFormatSwitch ? 'h:mm.ss' : 'h:mm A';
    timeFormatSwitch = !timeFormatSwitch;
    updateTime();

    extensionData['format'] = timeFormat;
    localStorage.setItem('newtab_extension', JSON.stringify(extensionData));
  })

});
