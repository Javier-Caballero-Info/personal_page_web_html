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

        // Fix: Placeholder polyfill.
        $('form').placeholder();

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

        $('.tooltip').tooltipster();

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

$(function () {

    $('#social-network').on('show', function() {
        $.getJSON('/json/social-network.json', function (data) {
            $.each(data, function (index, item) {
                $('#social-network').find('ul').append('\
                    <li> \
                    <a href="' + item.link + '"  data-ripple-color="#89669b"  target="_blank" class="social-links ripple" role="button"> \
                    <img alt="' + item.name + '" src="' + item.img + '"> \
                    </a> \
                    </li> \
                    ');
            })
        })
    });

    $('#biography').on('show', function() {

        $.getJSON('/json/biography.json', function (data) {

            $.each(data.work, function (index, item) {
                $('#biography').find('.work-timeline').find('ul').append('\
                    <li class="timeline-event"> \
                        <label class="timeline-event-icon"></label> \
                        <div class="timeline-event-copy"> \
                            <p class="timeline-event-thumbnail">' + item.time + '</p> \
                            <h3>' + item.company + '</h3> \
                            <h4>' + item.position + '</h4> \
                            <p>' + item.description + '</p> \
                        </div> \
                    </li> \
                ');
            });

            $.each(data.education, function (index, item) {

                var institute = item.institute.replace("-", "<br/>");

                $('#biography').find('.education-timeline').find('ul').append('\
                    <li class="timeline-event"> \
                        <label class="timeline-event-icon"></label> \
                        <div class="timeline-event-copy"> \
                            <p class="timeline-event-thumbnail">' + item.time + '</p> \
                            <h3>' + institute + '</h3> \
                            <h4>' + item.career + '</h4> \
                            <p><strong>' + item.detail + '</strong><br> \
                        </div> \
                    </li> \
                ');

            });

            $.each(data.research, function (index, item) {
                $('#biography').find('.research-timeline').find('ul').append('\
                    <li class="timeline-event"> \
                        <label class="timeline-event-icon"></label> \
                        <div class="timeline-event-copy"> \
                            <p class="timeline-event-thumbnail">' + item.time + '</p> \
                            <h3>' + item.group + '</h3> \
                            <h4>' + item.project + '</h4> \
                            <p>' + item.description + '</p> \
                        </div> \
                    </li> \
                ');
            });

            $.each(data.teacher, function (index, item) {

                var institute = item.institute.replace("-", "<br/>");

                var subject = item.subject.replace("-", "<br/>");

                $('#biography').find('.teacher-timeline').find('ul').append('\
                    <li class="timeline-event"> \
                        <label class="timeline-event-icon"></label> \
                        <div class="timeline-event-copy"> \
                            <p class="timeline-event-thumbnail">' + item.time + '</p> \
                             <h3>' + institute + '</h3> \
                            <h4>' + subject + '</h4> \
                            <p>' + item.annotation + '</p> \
                        </div> \
                    </li> \
                ');

            });

            /*
             $.each(data., function (index, item) {
             $('#social-network').find('ul').append('\
             <li> \
             <a href="' + item.link + '"  data-ripple-color="#89669b"  target="_blank" class="social-links ripple" role="button"> \
             <img alt="' + item.name + '" src="' + item.img + '"> \
             </a> \
             </li> \
             ');
             })
             */
        });

    });

});