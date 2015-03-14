$(function(){
    $(window).load(function() {
        $("#content").show();
        $('#loader-wrapper ').hide();
    });
    if( navigator.userAgent.match( /iPhone/i ) ) {
      $("#loader").addClass("loader-iphone");
    }
});

