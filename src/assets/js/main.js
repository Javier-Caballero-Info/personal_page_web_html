(function($) {

  skel.breakpoints({
    xlarge:		'(max-width: 1680px)',
    large:		'(max-width: 1280px)',
    medium:		'(max-width: 980px)',
    small:		'(max-width: 736px)',
    xsmall:		'(max-width: 480px)',
    xxsmall:	'(max-width: 360px)'
  });

  $(function() {

    var	$window = $(window),
      $body = $('body'),
      $wrapper = $('#wrapper'),
      $header = $('#header'),
      $footer = $('#footer'),
      $main = $('#main'),
      $main_articles = $main.children('article');

    // Disable animations/transitions until the page has loaded.
    $body.addClass('is-loading');

    $window.on('load', function() {
      window.setTimeout(function() {
        $body.removeClass('is-loading');
      }, 100);
    });

    // Fix: Flexbox min-height bug on IE.
    if (skel.vars.IEVersion < 12) {

      var flexboxFixTimeoutId;

      $window.on('resize.flexbox-fix', function() {

        clearTimeout(flexboxFixTimeoutId);

        flexboxFixTimeoutId = setTimeout(function() {

          if ($wrapper.prop('scrollHeight') > $window.height())
            $wrapper.css('height', 'auto');
          else
            $wrapper.css('height', '100vh');

        }, 250);

      }).triggerHandler('resize.flexbox-fix');

    }

    // Nav.
    var $nav = $header.children('nav'),
      $nav_li = $nav.find('li');

    // Add "middle" alignment classes if we're dealing with an even number of items.
    if ($nav_li.length % 2 == 0) {

      $nav.addClass('use-middle');
      $nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');

    }

    // Main.
    var	delay = 325,
      locked = false;

    // Methods.
    $main._show = function(id, initial) {

      var $article = $main_articles.filter('#' + id);

      // No such article? Bail.
      if ($article.length == 0)
        return;

      // Handle lock.

      // Already locked? Speed through "show" steps w/o delays.
      if (locked || (typeof initial != 'undefined' && initial === true)) {

        // Mark as switching.
        $body.addClass('is-switching');

        // Mark as visible.
        $body.addClass('is-article-visible');

        // Deactivate all articles (just in case one's already active).
        $main_articles.removeClass('active');

        // Hide header, footer.
        $header.hide();
        $footer.hide();

        // Show main, article.
        $main.show();
        $article.show();

        // Activate article.
        $article.addClass('active');

        // Unlock.
        locked = false;

        // Unmark as switching.
        setTimeout(function() {
          $body.removeClass('is-switching');
        }, (initial ? 1000 : 0));

        return;

      }

      // Lock.
      locked = true;

      // Article already visible? Just swap articles.
      if ($body.hasClass('is-article-visible')) {

        // Deactivate current article.
        var $currentArticle = $main_articles.filter('.active');

        $currentArticle.removeClass('active');

        // Show article.
        setTimeout(function() {

          // Hide current article.
          $currentArticle.hide();

          // Show article.
          $article.show();

          // Activate article.
          setTimeout(function() {

            $article.addClass('active');

            // Window stuff.
            $window
            .scrollTop(0)
            .triggerHandler('resize.flexbox-fix');

            // Unlock.
            setTimeout(function() {
              locked = false;
            }, delay);

          }, 25);

        }, delay);

      }

      // Otherwise, handle as normal.
      else {

        // Mark as visible.
        $body
        .addClass('is-article-visible');

        // Show article.
        setTimeout(function() {

          // Hide header, footer.
          $header.hide();
          $footer.hide();

          // Show main, article.
          $main.show();
          $article.show();

          // Activate article.
          setTimeout(function() {

            $article.addClass('active');

            // Window stuff.
            $window
            .scrollTop(0)
            .triggerHandler('resize.flexbox-fix');

            // Unlock.
            setTimeout(function() {
              locked = false;
            }, delay);

          }, 25);

        }, delay);

      }

    };

    $main._hide = function(addState) {

      var $article = $main_articles.filter('.active');

      // Article not visible? Bail.
      if (!$body.hasClass('is-article-visible'))
        return;

      // Add state?
      if (typeof addState != 'undefined'
        &&	addState === true)
        history.pushState(null, null, '#');

      // Handle lock.

      // Already locked? Speed through "hide" steps w/o delays.
      if (locked) {

        // Mark as switching.
        $body.addClass('is-switching');

        // Deactivate article.
        $article.removeClass('active');

        // Hide article, main.
        $article.hide();
        $main.hide();

        // Show footer, header.
        $footer.show();
        $header.show();

        // Unmark as visible.
        $body.removeClass('is-article-visible');

        // Unlock.
        locked = false;

        // Unmark as switching.
        $body.removeClass('is-switching');

        // Window stuff.
        $window
        .scrollTop(0)
        .triggerHandler('resize.flexbox-fix');

        return;

      }

      // Lock.
      locked = true;

      // Deactivate article.
      $article.removeClass('active');

      // Hide article.
      setTimeout(function() {

        // Hide article, main.
        $article.hide();
        $main.hide();

        // Show footer, header.
        $footer.show();
        $header.show();

        // Unmark as visible.
        setTimeout(function() {

          $body.removeClass('is-article-visible');

          // Window stuff.
          $window
          .scrollTop(0)
          .triggerHandler('resize.flexbox-fix');

          // Unlock.
          setTimeout(function() {
            locked = false;
          }, delay);

        }, 25);

      }, delay);


    };

    // Articles.
    $main_articles.each(function() {

      var $this = $(this);

      // Close.
      $('<div class="close">Close</div>')
      .appendTo($this)
      .on('click', function() {
        location.hash = '';
      });

      // Prevent clicks from inside article from bubbling.
      $this.on('click', function(event) {
        event.stopPropagation();
      });

    });

    // Events.
    $body.on('click', function(event) {

      // Article visible? Hide.
      if ($body.hasClass('is-article-visible'))
        $main._hide(true);

    });

    $window.on('keyup', function(event) {

      switch (event.keyCode) {

        case 27:

          // Article visible? Hide.
          if ($body.hasClass('is-article-visible'))
            $main._hide(true);

          break;

        default:
          break;

      }

    });

    $window.on('hashchange', function(event) {

      // Empty hash?
      if (location.hash == ''
        ||	location.hash == '#') {

        // Prevent default.
        event.preventDefault();
        event.stopPropagation();

        // Hide.
        $main._hide();

      }

      // Otherwise, check for a matching article.
      else if ($main_articles.filter(location.hash).length > 0) {

        // Prevent default.
        event.preventDefault();
        event.stopPropagation();

        // Show article.
        $main._show(location.hash.substr(1));

      }

    });

    // Scroll restoration.
    // This prevents the page from scrolling back to the top on a hashchange.
    if ('scrollRestoration' in history)
      history.scrollRestoration = 'manual';
    else {

      var	oldScrollPos = 0,
        scrollPos = 0,
        $htmlbody = $('html,body');

      $window
      .on('scroll', function() {

        oldScrollPos = scrollPos;
        scrollPos = $htmlbody.scrollTop();

      })
      .on('hashchange', function() {
        $window.scrollTop(oldScrollPos);
      });

    }

    // Initialize.

    // Hide main, articles.
    $main.hide();
    $main_articles.hide();

    // Initial article.
    if (location.hash != ''
      &&	location.hash != '#')
      $window.on('load', function() {
        $main._show(location.hash.substr(1), true);
      });


  });

})(jQuery);

var information = null;
var lang = 'es';

function getInformation(resource, callback){

  if (information === null){
    getAllInformation(function () {
      callback(information[resource])
    });
  } else {
    callback(information[resource])
  }

}

function getAllInformation(callback) {
  var url = 'https://javier-caballero-info.firebaseio.com/' + lang + '.json';
  $.getJSON(url, function (data) {
    information = data;
    if(callback) {
      callback();
    }
  });
}

function orderInformation(data, order, callback){

  var tmpArray = [];

  $.each(data, function (_, item) {

    tmpArray.push(item);

  });

  if (callback){
    if (order) {

      callback(
        tmpArray.sort(function (a, b) {
          var x = a['order'];
          var y = b['order'];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        })
      );

    } else {

      callback(
        tmpArray.sort(function (a, b) {
          var x = a['order'];
          var y = b['order'];
          return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        })
      );

    }
  }

}

$(function () {

  getAllInformation();

  $('#social-network').on('show', function() {

    getInformation('social-network', function (data) {

      orderInformation(data, true, function (orderedData) {

        $('#social-network').find('ul').empty();
        $.each(orderedData, function (index, item) {
          $('#social-network').find('ul').append('\
                    <li> \
                    <a href="' + item.link + '"  data-ripple-color="#89669b"  target="_blank" class="social-links ripple" role="button"> \
                    <img alt="' + item.name + '" src="' + item.img + '"> \
                    </a> \
                    </li> \
                    ');
        });
        hideArticleLoading('#social-network');

      });

    });

  });

  $('#contact').on('show', function() {

    getInformation('contact', function (data) {

      orderInformation(data, true, function (orderedData) {

        $('#contact').find('ul').empty();

        $.each(orderedData, function (index, item) {
          $('#contact').find('ul').append('\
                    <li> \
                        <div class="social-links ripple"> \
                            <img alt="' + item.name + '" src="' + item.img + '" class=""\
                             data-name="' + item.name + '" data-value="' + item.info + '" data-icon="' + item.icon + '"> \
                        </div> \
                    </li> \
                    ');
        });

      });

      $('#contact').find('ul').find('li').on('click', function() {

        var title = $(this).find('img').attr('data-name');

        var value = $(this).find('img').attr('data-value');

        var icon = $(this).find('img').attr('data-icon');

        var dataContact = ' \
                    <div> \
                        <h1><span class="' + icon + '"></span></h1> \
                        <h2>' + title + '</h2> \
                        <div class="alert alert-dark" role="alert"> \
                            ' + value + ' \
                        </div> \
                    </div> \
                    ';

        var contactModal =$('#contact-modal');
        contactModal.find('.iziModal-content').html(dataContact);
        contactModal.iziModal('setHeader', true);
        contactModal.iziModal('setTitle', title);
        contactModal.iziModal('open');

      });

      hideArticleLoading('#contact');

    });

  });

  $('#biography').on('show', function() {

    getInformation('work', function (data) {

      orderInformation(data, false, function (orderedData) {

        $('#biography').find('.work-timeline').find('ul').empty();

        $.each(orderedData, function (index, item) {
          $('#biography').find('.work-timeline').find('ul').append('\
                    <li class="timeline-event"> \
                      <div>\
                          <label class="timeline-event-icon"></label> \
                          <div class="timeline-event-copy"> \
                              <p class="timeline-event-thumbnail">' + item.time + '</p> \
                              <h3>' + item.company + '</h3> \
                              <h4>' + item.position + '</h4> \
                              <p class="description">' + item.description + '</p> \
                          </div> \
                      </div> \
                    </li> \
                ');
        });

        hideArticleLoading('#work');

      });

    });

    getInformation('education', function (data) {

      orderInformation(data, false, function (orderedData) {

        $('#biography').find('.education-timeline').find('ul').empty();

        $.each(orderedData, function (index, item) {

          var institute = item.institute.replace("-", "<br/>");

          $('#biography').find('.education-timeline').find('ul').append('\
                    <li class="timeline-event"> \
                      <div>\
                        <label class="timeline-event-icon"></label> \
                        <div class="timeline-event-copy"> \
                            <p class="timeline-event-thumbnail">' + item.time + '</p> \
                            <h3>' + institute + '</h3> \
                            <h4>' + item.career + '</h4> \
                            <p>' + item.detail + '</p> \
                        </div> \
                      </div> \
                    </li> \
                ');

        });

        hideArticleLoading('#education');

      });

    });

    getInformation('research', function (data) {

      orderInformation(data, false, function (orderedData) {

        $('#biography').find('.research-timeline').find('ul').empty();

        $.each(orderedData, function (index, item) {
          $('#biography').find('.research-timeline').find('ul').append('\
                    <li class="timeline-event"> \
                      <div>\
                        <label class="timeline-event-icon"></label> \
                        <div class="timeline-event-copy"> \
                            <p class="timeline-event-thumbnail">' + item.time + '</p> \
                            <h3>' + item.group + '</h3> \
                            <h4>' + item.project + '</h4> \
                            <p class="description">' + item.description + '</p> \
                        </div> \
                      </div> \
                    </li> \
                ');
        });

        hideArticleLoading('#research');

      });

    });

    getInformation('scholastic', function (data) {

      orderInformation(data, false, function (orderedData) {

        $('#biography').find('.teacher-timeline').find('ul').empty();

        $.each(orderedData, function (index, item) {

          var institute = item.institute.replace("-", "<br/>");

          var subject = item.subject.replace("-", "<br/>");

          $('#biography').find('.teacher-timeline').find('ul').append('\
                    <li class="timeline-event"> \
                      <div>\
                        <label class="timeline-event-icon"></label> \
                        <div class="timeline-event-copy"> \
                            <p class="timeline-event-thumbnail">' + item.time + '</p> \
                             <h3>' + institute + '</h3> \
                            <h4>' + subject + '</h4> \
                            <p class="description">' + item.description + '</p> \
                        </div> \
                      </div> \
                    </li> \
                ');

        });

        hideArticleLoading('#teacher');

      });

    });

  });

  $('#portfolio').on('show', function() {

    console.log("portfolio");

    getInformation('portfolio', function (data) {

      orderInformation(data, true, function (orderedData) {

        var portfolioItem = $('#portfolio').find('ul.portfolio-list');

        portfolioItem.empty();

        $.each(orderedData, function (index, item) {

          var portfolioItemHTML = '\
                    <li class="timeline-event"> \
                      <h2>' + item.name + '</h2> \
                      <p class="text-justify m-0"><strong>Descripción: </strong> <br/>' + item.description + '</p>';

          portfolioItemHTML += '<ul>';

          $.each(item.resources, function (index, item) {
            portfolioItemHTML += '<li class="resource mt-4">';

            portfolioItemHTML += '<h2>' + item.name + '</h2>';
            portfolioItemHTML += '<p class="text-justify m-0">' + item.description + '</p>';

            portfolioItemHTML += '<hr class="mb-3 mt-3"/>';


            portfolioItemHTML += '<h4>Links:</h4>';

            var linksHTML = '<ul class="link-list">';

            $.each(item.links, function (index, item) {

              linksHTML += '<li>' +
                  '<a href="' + item.link + '" target="_blank">' +
                    '<i class="fa fa-' + item.icon.split(' ')[1] +' mr-2"></i>' +
                    item.name +
                  '</a>' +
                '</li>';
            });

            linksHTML += '</ul>';

            portfolioItemHTML += linksHTML;


            portfolioItemHTML += '<hr class="mb-3 mt-3"/>';

            var technologiesHTML = '<ul class="technology-list">';

            $.each(item.technologies, function (index, item) {

              technologiesHTML += '<li>' + item + '</li>'

            });

            technologiesHTML += '</ul>';

            portfolioItemHTML += technologiesHTML;

            portfolioItemHTML += '</li>';

          });

          portfolioItemHTML += '</ul>';

          portfolioItemHTML +=  '</li>';

          portfolioItem.append(portfolioItemHTML);

          console.log(item);

        });
        hideArticleLoading('#portfolio');

      });

    });

  });

});


/*----------------------------------------------------------------------
 Javascript Function Initialize Particules
 -----------------------------------------------------------------------*/

$(function () {

  if ( typeof particlesJS !== "undefined") {

    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 30,
          "density": {
            "enable": true,
            "value_area": 600
          }
        },
        "color": {
          "value": '#888'
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#888"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#bbb",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 4,
          "direction": "bottom",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "retina_detect": true,
      "config_demo": {
        "hide_card": false,
        "background_color": "#b61924",
        "background_image": "",
        "background_position": "50% 50%",
        "background_repeat": "no-repeat",
        "background_size": "cover"
      }
    });
  }
});