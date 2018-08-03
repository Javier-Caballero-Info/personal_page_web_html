$(function () {

  if ( typeof particlesJS !== "undefined") {

      particlesJS.load('particles-js', "https://s3.amazonaws.com/caballerojavier13-pages-files/personal_page/General/particles.json");

  }

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