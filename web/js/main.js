$(document).ready(function() {

  // Fakes the loading setting a timeout
  setTimeout(function() {
    $("#content").show();
    $('body').addClass('loaded');
  }, 10000);

});
