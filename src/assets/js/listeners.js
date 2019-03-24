
$(function () {

  // main.getAllInformation('en');
  
  render_html.renderHome();

  $('#social-network').on('show', function() {

    render_html.renderSocialNetwork();

  });

  $('#contact').on('show', function() {

    render_html.renderContact();

  });

  $('#biography').on('show', function() {

    render_html.renderWork();

    render_html.renderEducation();

    render_html.renderResearch();

    render_html.renderScholastic();

  });

  $('#portfolio').on('show', function() {

    render_html.renderPortfolio();

  });

  $('.custom-option').on("click", function(e) {
    main.getAllInformation($('#language').val(), function () {
      render_html.renderHome();
    });
  });

  $('#contact-modal').on('click', function (e) {
    e.preventDefault();
    return false;
  });

});