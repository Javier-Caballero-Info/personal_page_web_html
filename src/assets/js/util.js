window.jQuery = window.$;

(function ($) {
  $.each(['show', 'hide'], function (i, ev) {
    var el = $.fn[ev];
    $.fn[ev] = function () {
      this.trigger(ev);
      return el.apply(this, arguments);
    };
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


  $('#contact-modal').on('click', function (e) {
    e.preventDefault();
    return false;
  });

})(jQuery);

function hideArticleLoading(article){
  $(article).find('.loader').hide();
  $(article).find('ul').css('opacity', '1');
  $(article).find('ul').css('opacity', '1');
}