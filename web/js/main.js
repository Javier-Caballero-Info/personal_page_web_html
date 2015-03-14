$(function(){
    $(window).load(function() {
      setTimeout(function() {
        $("#content").show();
        $('body').addClass('loaded');
      }, 3000);
    });
});
