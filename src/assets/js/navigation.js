const navigation = function() {

  const	$window = $(window),
    $body = $('body'),
    $header = $('header'),
    $footer = $('footer'),
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
  const $nav = $header.children('nav'),
    $nav_li = $nav.find('li');

  // Add "middle" alignment classes if we're dealing with an even number of items.
  if ($nav_li.length % 2 === 0) {

    $nav.addClass('use-middle');
    $nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');

  }

  // Main.
  let	delay = 325,
    locked = false;

  // Methods.
  $main._show = function(id, initial) {

    const $article = $main_articles.filter('#' + id);

    // No such article? Bail.
    if ($article.length === 0)
      return;

    // Lock.
    locked = true;

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
    if (location.hash === ''
      ||	location.hash === '#') {

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

  // Initialize.

  // Hide main, articles.
  $main.hide();
  $main_articles.hide();

  // Initial article.
  if (location.hash !== ''
    &&	location.hash !== '#')
    $window.on('load', function() {
      $main._show(location.hash.substr(1), true);
    });


};

navigation();