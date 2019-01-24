$(function () {

  if ( typeof particlesJS !== "undefined") {

      particlesJS.load('particles-js', "https://s3.amazonaws.com/caballerojavier13-pages-files/personal_page/General/particles.json");

  }

  $(".languages_picker").each(function() {
    var classes = $(this).attr("class"),
        id      = $(this).attr("id"),
        name    = $(this).attr("name");
    var template =  '<div class="' + classes + '">';
    template += '<span class="languages_picker-trigger">' + $(this).attr("placeholder") + '</span>';
    template += '<div class="custom-options">';
    $(this).find("option").each(function() {
      template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
    });
    template += '</div></div>';

    $(this).wrap('<div class="languages_picker-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
  });
  $(".custom-option:first-of-type").hover(function() {
    $(this).parents(".custom-options").addClass("option-hover");
  }, function() {
    $(this).parents(".custom-options").removeClass("option-hover");
  });
  $(".languages_picker-trigger").on("click", function() {
    $('html').one('click',function() {
      $(".languages_picker").removeClass("opened");
    });
    $(this).parents(".languages_picker").toggleClass("opened");
    event.stopPropagation();
  });
  $(".custom-option").on("click", function() {
    $(this).parents(".languages_picker-wrapper").find("select").val($(this).data("value"));
    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".languages_picker").removeClass("opened");
    $(this).parents(".languages_picker").find(".languages_picker-trigger").text($(this).text());
  });

  $("#contact-modal").iziModal({
    title: '',
    subtitle: '',
    header: true,
    theme: "light",
    headerColor: '#50585e',
    rtl: false,
    width: 600,
    radius: 3,
    zindex: 999,
    history: false,
    restoreDefaultContent: false,
    autoOpen: 0, // Boolean, Number
    bodyOverflow: false,
    closeOnEscape: false,
    closeButton: true,
    appendTo: 'body', // or false
    appendToOverlay: false, // or false
    overlay: false,
    timeoutProgressbarColor: 'rgba(255,255,255,0.5)',
    transitionIn: 'comingIn',
    transitionOut: 'comingOut',
    transitionInOverlay: 'fadeIn',
    transitionOutOverlay: 'fadeOut'
  });

});