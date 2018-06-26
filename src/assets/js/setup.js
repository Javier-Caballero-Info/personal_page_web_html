
$(function() {

  var	$window = $(window),
    $body = $('body'),
    $header = $('header'),
    $footer = $('#footer'),
    $main = $('main'),
    $main_articles = $main.children('article');

  // Disable animations/transitions until the page has loaded.
  $body.addClass('is-loading');

  $window.on('load', function() {
    window.setTimeout(function() {
      $body.removeClass('is-loading');
    }, 100);
  });

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