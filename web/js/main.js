$(function(){
    $(window).load(function() {
        setTimeout(function() {
            $("#content").show();
            $('#loader-wrapper').hide();
            $(".pace-running").hide();
        }, 1000);
    });
});

