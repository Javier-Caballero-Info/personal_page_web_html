$(function(){
    $(window).load(function() {
      setTimeout(function() {
        $("#content").show();
        $('#loader-wrapper ').hide();
      }, 3000);
    });
    if( navigator.userAgent.match( /iPhone/i ) ) {
      $("#loader").addClass("loader-iphone");
    }
});

