/*-----------------------------------------------------------------------------------
/*
/* Script for Resume
/*
-----------------------------------------------------------------------------------*/


/*----------------------------------------------------*/
/* Preloader
------------------------------------------------------ */

$(window).load(function(){

    cargarImagenes();

    var configProfileTwitter = {
        "profile": {"screenName": 'J_H_Caballero_G'},
        "maxTweets": 1,
        "enableLinks": true,
        "showUser": false,
        "showTime": false,
        "showImages": false,
        "dateFunction": '',
        "showRetweet": false,
        "customCallback": handleTweets,
        "showInteraction": false
    };
    twitterFetcher.fetch(configProfileTwitter);

    function handleTweets(tweets) {

        $.each(tweets, function (index, item) {

            $('#twitter').find('.loading').hide();
            $('#twitter').find('.twitter-bird-animation').hide();

            var last_twit = $(item).html();

            $('#twitter').find('.twit').html(last_twit);
            $('#twitter').find('.twit').find('p').prepend('"');
            $('#twitter').find('.twit').find('p').append('"');

        });
    }

});

function cargarImagenes(){

    $('body').imagesLoaded()
      .always( function( instance ) {
        //loadFinish();
      })
      .done( function( instance ) {
        loadFinish();
      })
      .fail( function() {
        console.log('all images loaded, at least one is broken');
    });

}

function loadFinish(){
    $('.loader').fadeOut('slow');
    $('section').delay(350).show();
    $('header').delay(350).show();
    $('footer').delay(350).show();
    if($(window).width() > 1000){
    //    particlesJS("particles-js", particleConfig());
    }

}


 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* Initializing jQuery Nice Scroll
------------------------------------------------------ */

    $("html").niceScroll({
      cursorcolor:"#11abb0", // Set cursor color
      cursorwidth: "8", // Sety cursor width
      cursorborder: "", // Set cursor border color, default left none
      horizrailenabled:false
    });


/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */

    setTimeout(function() {
	   $('h1.responsive-headline').fitText(1, { minFontSize: '28px', maxFontSize: '72px' });
	 }, 100);


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });

	});


/*----------------------------------------------------*/
/* Appear Animation
------------------------------------------------------*/
//  new WOW().init();

/*----------------------------------------------------*/
/* Parallax for Header Content
------------------------------------------------------*/
$(window).scroll(function(e){
  parallax();
});


function parallax() {
  var scrollPosition = $(window).scrollTop();
  $('.banner').css('margin-top', (0 - (scrollPosition * .8)) + 'px');
}

/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#left-nav a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#left-nav a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
   });


/*----------------------------------------------------*/
/*  On scroll blur header
------------------------------------------------------*/
   (function() {
      $(window).scroll(function() {
        var oVal;
        oVal = $(window).scrollTop() / 100;
        return $(".header-overlay").css("opacity", oVal);
        });

      }).call(this);



/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

  $('#menu-toogle').click(function(){
    //$(document.body).toggleClass("show-menu");
    //$('.menu').toggleClass("close-menu");
    $('#menu').find('ul').find('li').toggleClass("item");
    $(this).toggleClass('menu-active');
  });


  var Menu = {

    el: {
      ham: $('.menu'),
      menuTop: $('.menu-top'),
      menuMiddle: $('.menu-middle'),
      menuBottom: $('.menu-bottom')
    },

    init: function() {
      Menu.bindUIactions();
    },

    bindUIactions: function() {
      Menu.el.ham
          .on(
            'click',
          function(event) {
          Menu.activateMenu(event);
          event.preventDefault();
        }
      );
    },

    activateMenu: function() {
      Menu.el.menuTop.toggleClass('menu-top-click');
      Menu.el.menuMiddle.toggleClass('menu-middle-click');
      Menu.el.menuBottom.toggleClass('menu-bottom-click');
    }
  };

  //Menu.init();

/* Animate Left Menu */


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

    $('.modal-link').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });


/*----------------------------------------------------*/
/*  Owl Carousel
/*----------------------------------------------------*/


    $(document).ready(function() {

    $("#testimonial-slides").owlCarousel({

    navigation : false, // Show next and prev buttons
    slideSpeed : 300,
    paginationSpeed : 400,
    singleItem:true,
    autoPlay: 10000,
    autoplayHoverPause: true

    // "singleItem:true" is a shortcut for:
    // items : 1,
    // itemsDesktop : false,
    // itemsDesktopSmall : false,
    // itemsTablet: false,
    // itemsMobile : false

    });

    });
});

$(function(){
    /* Efecto flotar en la sección Greenpeace */
    greenpeace = function () {
        var addPath, addPoints, animatePath, canvas, i, j, n, opacity, path, paths, ref, view;
        canvas = document.getElementById('greenpeace_canvas');
        paper.setup(canvas);
        view = paper.project.view;
        paths = new paper.Group();
        addPoints = function (path, quantity) {
            var i, j, ref, x, y;
            path.add(view.bounds.bottomLeft);
            for (i = j = -1, ref = quantity + 1; j <= ref; i = j += 1) {
                x = view.viewSize.width / quantity * i;
                y = view.viewSize.height / 1.1;
                path.add(new paper.Point(x, y));
            }
            return path.add(view.bounds.bottomRight);
        };
        addPath = function (quantity, color, opacity) {
            var path;
            path = new paper.Path();
            path.fillColor = color;
            path.opacity = opacity;
            addPoints(path, quantity);
            path.smooth();
            return path;
        };
        animatePath = function (path, event, index) {
            var i, j, len, ref, results, segment, sin;
            ref = path.segments;
            results = [];
            for (i = j = 0, len = ref.length; j < len; i = ++j) {

                segment = ref[i];
                if (i > 0 && i < path.segments.length - 1) {
                    sin = Math.sin(event.time * 2 + i - index);
                    results.push(segment.point.y = sin * 10 + view.viewSize.height / 1.3 + index * 5);
                } else {
                    results.push(void 0);
                }
            }
            return results;
        };
        n = 8;
        opacity = 1 / (n / 2);
        for (i = j = 1, ref = n; j <= ref; i = j += 1) {
            path = addPath(8 - i, '#21f8f6', i * opacity);
            path.position.y += 10 * i;
            paths.addChild(path);
        }
        view.onFrame = function (event) {
            var k, len, ref1, results;
            ref1 = paths.children;
            results = [];
            for (i = k = 0, len = ref1.length; k < len; i = ++k) {
                path = ref1[i];
                results.push(animatePath(path, event, i));
            }
            return results;
        };
        view.draw();
        return null;
    };
    greenpeace();
});


$(function () { // wait for document ready
		var flightpath = {
			entry : {
				curviness: 1.25,
				autoRotate: false,
				values: [
						{x: -400,	y: -20},
						{x: 300,	y: 10}
					]
			},
			looping : {
				curviness: 1.25,
				autoRotate: true,
				values: [
						{x: 510,	y: 60},
						{x: 620,	y: -60},
						{x: 500,	y: -100},
						{x: 380,	y: 20},
						{x: 500,	y: 60},
						{x: 580,	y: 20},
						{x: 620,	y: 15}
					]
			},
			leave : {
				curviness: 1.25,
				autoRotate: true,
				values: [
						{x: 660,	y: 20},
						{x: 800,	y: 130},
						{x: $(window).width() + 600,	y: -100}
					]
			}
		};
		// init controller
		var controller = new ScrollMagic.Controller();

		var tween = new TimelineMax()
			.add(TweenMax.to($("#plane"), 1.2, {css:{bezier:flightpath.entry}, ease:Power1.easeInOut}))
			.add(TweenMax.to($("#plane"), 2, {css:{bezier:flightpath.looping}, ease:Power1.easeInOut}))
			.add(TweenMax.to($("#plane"), 1, {css:{bezier:flightpath.leave}, ease:Power1.easeInOut}));

		var scene1 = new ScrollMagic.Scene({triggerElement: "#trigger_plane", duration: 500, offset: 0})
						.setPin("#target_plane")
						.setTween(tween)
						.addTo(controller);

        var scene2 = new ScrollMagic.Scene({triggerElement: "#trigger_home", duration: 300, offset: 200})
                        // animate color and top border in relation to scroll position
                        .setTween("#animate_home", {fiter: 'blur(5px)', opacity: 0}) // the tween durtion can be omitted and defaults to 1
                        .addTo(controller);

    	var scene3 = new ScrollMagic.Scene({triggerElement: "#triggerResumen", duration: 2300})
    					.setTween(TweenMax.staggerFromTo(".timeline-event", 1, {left: $(window).width()}, {left: 0,ease: Power1.easeInOut}, 1))

    					.addTo(controller);
        var scene4 = new ScrollMagic.Scene({triggerElement: "#triggerResumen", duration: 2300})
    					.setTween(TweenMax.staggerFromTo(".timeline-title", 1, {left: '-100%'}, {left: 0,ease: Power1.easeInOut}, 1))

    					.addTo(controller);
        var scene5 = new ScrollMagic.Scene({triggerElement: "#trigger_about", duration: 200})
                    	.addTo(controller)
                    	.on("enter leave", function (e) {
                    		if(e.type == "enter"){
                                writeResume();
                            }
                    	})
        function pathPrepare ($el) {
    		var lineLength = $el.getTotalLength();
    		$($el).css("stroke-dashoffset", lineLength);
            $($el).css("stroke-dasharray", lineLength);
    	}

        var $word1 = $('#greenpeace').find("path")[0];
        var $word2 = $('#greenpeace').find("path")[1];
        var $word3 = $('#greenpeace').find("path")[2];
        var $word4 = $('#greenpeace').find("path")[3];
        var $word5 = $('#greenpeace').find("path")[4];
        var $word6 = $('#greenpeace').find("path")[5];
        var $word7 = $('#greenpeace').find("path")[6];

	// prepare SVG
	pathPrepare($word1);
    pathPrepare($word2);
    pathPrepare($word3);
    pathPrepare($word4);
    pathPrepare($word5);
    pathPrepare($word6);
    pathPrepare($word7);
	//pathPrepare($dot);

	// build tween
	var tween2 = new TimelineMax()
        .add(TweenMax.to($word2, 0.2, {strokeDashoffset: 0, ease:Linear.easeInOut}))
        .add(TweenMax.to($word7, 0.2, {strokeDashoffset: 0, ease:Linear.easeInOut}))
        .add(TweenMax.to($word1, 0.2, {strokeDashoffset: 0, ease:Linear.easeInOut}))
        .add(TweenMax.to($word3, 0.1, {strokeDashoffset: 0, ease:Linear.easeInOut}))
        .add(TweenMax.to($word4, 0.1, {strokeDashoffset: 0, ease:Linear.easeInOut}))
        .add(TweenMax.to($word5, 0.1, {strokeDashoffset: 0, ease:Linear.easeInOut}))
        .add(TweenMax.to($word6, 0.1, {strokeDashoffset: 0, ease:Linear.easeInOut}))
		.add(TweenMax.to("path", 0, {stroke: "#73C82C", ease:Linear.easeInOut}));

    var scene6 = new ScrollMagic.Scene({triggerElement: "#trigger_greenpeace", duration: 200, tweenChanges: true})
    					.setTween(tween2)
    					.addTo(controller);

    var tween3 = new TimelineMax()
    .add(TweenMax.to($word2, 0.2, {fill: "#73C82C", ease:Linear.easeInOut}))
    .add(TweenMax.to($word7, 0.2, {fill: "#73C82C", ease:Linear.easeInOut}))
    .add(TweenMax.to($word1, 0.2, {fill: "#73C82C", ease:Linear.easeInOut}))
    .add(TweenMax.to($word3, 0.1, {fill: "#73C82C", ease:Linear.easeInOut}))
    .add(TweenMax.to($word4, 0.1, {fill: "#73C82C", ease:Linear.easeInOut}))
    .add(TweenMax.to($word5, 0.1, {fill: "#73C82C", ease:Linear.easeInOut}))
    .add(TweenMax.to($word6, 0.1, {fill: "#73C82C", ease:Linear.easeInOut}));

    var scene7 = new ScrollMagic.Scene({triggerElement: "#trigger_greenpeace", duration: 200, tweenChanges: true, offset: 200})
    					.setTween(tween3)
    					.addTo(controller);
	});


    /* ---- particles.js config ---- */

function particleConfig(){
    return {
      "particles": {
        "number": {
          "value": 154,
          "density": {
            "enable": true,
            "value_area": 710.2328774690454
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
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
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "bubble"
          },
          "onclick": {
            "enable": false,
            "mode": "repulse"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 191.80819180819182,
            "size": 3.996003996003996,
            "duration": 0.8791208791208792,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    };
}

(function (window, $) {

  $(function() {


    $('.ripple').on('click', function (event) {
     event.stopPropagation();

      var $div = $('<div/>'),
          btnOffset = $(this).offset(),
      		xPos = event.pageX - btnOffset.left,
      		yPos = event.pageY - btnOffset.top;



      $div.addClass('ripple-effect');
      var $ripple = $(".ripple-effect");

      $ripple.css("height", $(this).height());
      $ripple.css("width", $(this).height());
      $div
        .css({
          top: yPos - ($ripple.height()/2),
          left: xPos - ($ripple.width()/2),
          background: $(this).data("ripple-color")
        })
        .appendTo($(this));

      window.setTimeout(function(){
        $div.remove();
      }, 2000);
    });

  });

})(window, jQuery);


function writeResume(){
    if($('#about').find('.split').text().length < 1){
        $('#about').find('.split').typeIt()
            .tiSettings({speed: 50})
            .tiType('Este sitio ha sido construido tras 10 a 15 minutos de programación durante varios días. Es una manera de demostrar que pequeñas acciones diarias logran grandes resultados. Mi vida se sintetiza de igual manera, día a día contruyo un futuro que deseo. Con mi sitio no pretendo mostrarte lo que soy, todo lo contrario, no tengo ningún motivo para ocultar mis logros. Se que no he logrado nada en mi vida que pueda cambiar el mundo, pero día tras día me esfuerzo en hacer de él un mejor lugar para vivir.');
    }
}
