(function ($) {
  $(document).ready(function () {
    var onHomePage = $('.homepage').length > 0;
    if (onHomePage) {
      cu_window_manager.initialize();
      cu_hero_area.initialize();
      //cu_stories_area.initialize();
      cu_admission_area.initialize();

      heroModalViewer.initialize();
      setGeneralInfoMinHeight();
      animateOnScroll();
      setTimeout(function () { addSquigglyUnderline() }, 1000);
    }
  });

  $(window).on("resize", function (e) {
    setGeneralInfoMinHeight();
  });

  function addSquigglyUnderline() {
    if ($('a.tag').length > 1) {
      $('a.tag').wrapInner("<span class='squiggle squiggle-2-2'></span>");
    }
  }

  function animateOnScroll() {
    $('#generalInformation h2').attr({
      'data-aos': "fade-up",
      'data-aos-duration': "500",
    });

    $('#generalInformation .third:first-of-type').attr({
      'data-aos': "fade-left",
      'data-aos-duration': "500"
    });

    $('#generalInformation .third:nth-child(2n)').attr({
      'data-aos': "fade-left",
      'data-aos-duration': "500",
      'data-aos-delay': '100'
    });

    $('#generalInformation .third:nth-child(3n)').attr({
      'data-aos': "fade-left",
      'data-aos-duration': "500",
      'data-aos-delay': "200"
    });
    // chapmanFamily

    $('#chapmanFamily h2').attr({
      'data-aos': "zoom-in-up",
      'data-aos-duration': "500",
    });

    $('#chapmanFamily .third:first-of-type').attr({
      'data-aos': "zoom-in-right",
      'data-aos-duration': "500"
    });

    $('#chapmanFamily .third:nth-child(2n)').attr({
      'data-aos': "zoom-in-up",
      'data-aos-duration': "500"
    });


    $('#chapmanFamily .third:nth-child(3n)').attr({
      'data-aos': "zoom-in-left",
      'data-aos-duration': "500"
    });

    $('#accessibility-statement').attr({
      'data-aos': "fade-up",
      'data-aos-duration': "500",
    });

    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 122, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });
  }

  function setGeneralInfoMinHeight() {
    var minHeight = 'auto';

    if ($(window).width() < 600) {
      $('#generalInformation .third').attr('height', 'max-content');
    }
    else {
      $('#generalInformation .third').each(function () {
        var thisH = $(this).height();
        if (thisH > minHeight) { minHeight = thisH; }
      });
    }

    $('#generalInformation .third').height(minHeight);
  }
  // A class to manage window resizer and scroller functions
  var cu_window_manager = {
    // Manual Configs
    resizerLatency: 20, // in milliseconds. Higher = less CPU, lower = faster UI
    // Automagic Configs (changed by the script)
    useTransitions: true,
    useParallax: true,
    cannotAutoplayVideo: false,
    // Vars to initialize
    resizeTimeout: null,
    windowWidth: null,
    windowHeight: null,
    scrollTop: null,
    scrollBot: null,
    getVars: null,
    initialize: function () {
      // Check device type
      var i = 0,
        is_iOS = false,
        iDevice = ['iPad', 'iPhone', 'iPod'];
      for (; i < iDevice.length; i++) {
        if (navigator.platform === iDevice[i]) {
          is_iOS = true;
          break;
        }
      }
      var ua = navigator.userAgent.toLowerCase();
      var is_Android = ua.indexOf('android') > -1; //&& ua.indexOf("mobile");
      // Determine if this device cannot autoplay HTML5 video
      if (is_Android || is_iOS) {
        cu_window_manager.cannotAutoplayVideo = true;
        cu_window_manager.useTransitions = true;
      }
      if (
        !/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
          navigator.userAgent || navigator.vendor || window.opera
        )
      ) {
        cu_window_manager.useParallax = true;
        cu_parallax_fx.setupFX();
      } else {
        cu_window_manager.useParallax = false;
      }
      // Set up window change events
      if (window.addEventListener) {
        window.addEventListener('scroll', cu_window_manager.scroller, false);
        window.addEventListener('resize', cu_window_manager.resizer, false);
      } else if (window.attachEvent) {
        window.attachEvent('onscroll', cu_window_manager.scroller);
        window.attachEvent('onresize', cu_window_manager.resizer);
      }
      // Intial vars
      cu_window_manager.scrollTop = $(window).scrollTop();
      cu_window_manager.windowWidth = $(window).width();
      cu_window_manager.windowHeight = $(window).height();
      // Featured story image rotator
      $('#featured_stories').find('.imagerotator').cycle({
        next: '.imagerotator', // selector to advance slide on click
        delay: 0, // additional delay before starting slideshow
        timeout: 2000, // time between transitions
        speed: 1400, // speed of transition
        pause: false, // pause on mouse hover?
        slideExpr: 'img' // only select child elements that match this
      });
      var speeds = [];
      speeds[0] = 0;
      speeds[1] = 4000;
      speeds[2] = 2000;
      $('#generalInformation').find('.imagerotator').each(function (i) {
        $(this).cycle({
          delay: speeds[i], // additional delay before starting slideshow
          timeout: 7000, // time between transitions
          speed: 2000, // speed of transition
          pause: false, // pause on mouse hover?
          slideExpr: 'img' // only select child elements that match this
        });
      });
    }, // end initialize
    /***************************************************
     * The purpose of the resizer function is to act as a buffer to prevent rapid execution of the functions which must run on window resize.
     * By using a timetout, we can reduce the number of times these functions are called to increase browser performance.
     ***************************************************/
    resizer: function () {
      if (cu_window_manager.resizeTimeout != null) {
        clearTimeout(cu_window_manager.resizeTimeout);
      }
      cu_window_manager.resizeTimeout = setTimeout(function () {
        cu_window_manager.resizeTimeout = null;
        // Update vars
        cu_window_manager.windowWidth = $(window).width();
        cu_window_manager.windowHeight = $(window).height();
        // FUNCTIONS TO FIRE ON RESIZE HERE:
        cu_hero_area.adjustVideoSize();
      }, cu_window_manager.resizerLatency);
    }, // end resizer
    scroller: function () {
      // Update vars
      cu_window_manager.scrollTop = $(window).scrollTop();
      cu_window_manager.scrollBot = cu_window_manager.scrollTop + cu_window_manager.windowHeight;
      // FUNCTIONS TO FIRE ON SCROLL HERE:
      if (cu_window_manager.useParallax) cu_parallax_fx.process();
    } // end scroller
  }; // end cu_window_manager
  // Contains the animation FX
  var cu_parallax_fx = {
    enabled: false, // starts false
    skrollr: null,
    admissionStartPX: null,
    admissionAnimationReady: false,
    $undergraduateAdmission: null,
    graduateAdmissionStartPX: null,
    graduateAdmissionAnimationReady: false,
    $graduateAdmission: null,
    // Prep the elements by hiding them as needed. Run only once.
    setupFX: function () {
      /*
       * Undergraduate Admission
       *************************/
      this.$undergraduateAdmission = $('#undergraduateAdmission');
      //This is causing a breaking change "Uncaught TypeError: Cannot read property 'top' of null" in development
      if (this.$undergraduateAdmission.find('.statistics').length > 0) {
        this.admissionStartPX = this.$undergraduateAdmission.find('.statistics').offset().top;
      } else {
        this.admissionStartPX = 0;
      }
      this.$undergraduateAdmission.find('.fade-elem').css('opacity', 0); // prep for fade in
      /*
       * Graduate Admission
       *************************/
      this.$graduateAdmission = $('#graduateAdmission');
      if (this.$graduateAdmission.length > 0) {
        this.graduateAdmissionStartPX = this.$graduateAdmission.offset().top;
      } else {
        this.graduateAdmissionStartPX = 0;
      }
      this.process(); // in case we already scrolled
    },
    // Re-run as needed.
    enable: function () {
      // DO ENABLE TASKS
      try {
        // Do not initialize Skrollr on mobile.
        if (
          !/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
            navigator.userAgent || navigator.vendor || window.opera
          )
        ) {
          cu_parallax_fx.skrollr = skrollr.init({
            forceHeight: false
          });
        }
      } catch (e) {
        // No Skrollr support
      }
      this.graduateAdmissionAnimationReady = true;
      this.admissionAnimationReady = true;
      cu_parallax_fx.enabled = true;
    },
    // Re-run as needed.
    disable: function () {
      // DO DISABLE TASKS
      cu_parallax_fx.skrollr.destroy();
      cu_parallax_fx.enabled = false;
      this.$graduateAdmission.css('background-size', '');
    },
    // Fire on scroll to position elements
    process: function () {
      if (!cu_parallax_fx.enabled && cu_window_manager.windowWidth > 640) {
        cu_parallax_fx.enable();
      } else if (cu_parallax_fx.enabled && cu_window_manager.windowWidth < 640) {
        cu_parallax_fx.disable();
      }
      if (!cu_parallax_fx.enabled) return false;
      /*
       * Undergraduate Admission | number counter
       *************************/
      if (this.admissionAnimationReady && cu_window_manager.scrollBot > this.admissionStartPX) {
        this.animateAdmissionNumbers();
        this.$undergraduateAdmission.find('.fade-elem').each(function (i) {
          var $elem = $(this);
          setTimeout(function () {
            $elem.animate({
              opacity: '1'
            }, 1000, 'linear');
          }, 600 * i);
        });
        this.admissionAnimationReady = false;
      }
      /*
       * Graduate Admission | ken burns
       *************************/
      // TODO: dead code - remove in future.
      // if (this.graduateAdmissionAnimationReady && cu_window_manager.scrollBot > this.graduateAdmissionStartPX ) {
      //  // this.kenBurns(this.$graduateAdmission);
      //  this.graduateAdmissionAnimationReady = false;
      // }
      if (cu_window_manager.scrollTop < 100) {
        // Reset the animation if the user goes to the top.
        this.graduateAdmissionAnimationReady = true;
        this.admissionAnimationReady = true;
      }
    },
    /***************************************************
     * Ken burns FX for BG image of element
     ***************************************************/
    kenBurns: function ($elem) {
      // Do not fire if frame is already visible
      if ($elem.css('background-size') == '100%') {
        $elem.animate({
          'background-size': '120%'
        }, 10000, 'swing');
      } else {
        $elem.css('background-size', '120%');
        $elem.animate({
          'background-size': '100%'
        }, 10000, 'swing');
      }
    },
    animateAdmissionNumbers: function () {
      this.$undergraduateAdmission.find('.statistics').find('li').each(function (i) {
        var $label = $(this).find('.label');
        var $bigstat = $(this).find('.bigstat');
        $bigstat.css('opacity', 0);
        $label.css('opacity', 0);
        setTimeout(function () {
          cu_parallax_fx.animateSingleNumber($bigstat);
          increaseOpactiyWhenVisible();
        }, 100 * Math.floor(Math.random() * 10 + 1));

        function increaseOpactiyWhenVisible() {
          $(window).scroll(function () {
            var scrollTop = $('#undergraduateAdmission').scrollTop();
            $bigstat.animate({
              opacity: 1
            }, 600);
            $label.animate({
              opacity: 1
            }, 400);
          });
        }
      });
    },
    /***************************************************
     * Takes a jQuery element $elem and animates the inner HTML if it is a number.
     * Counts up to 'final_num' from 'start_num' over 'duration' milliseconds.
     ***************************************************/
    animateSingleNumber: function ($elem, final_num, start_num, duration) {
      var original_num = $elem.html();
      // If not set, take inner HTML of elem
      if (!final_num) final_num = parseFloat($elem.html().replace(/,/, ''));
      if ($($elem.attr('data-count').length)) {
        var original_num = $elem.attr('data-count');
      }
      // If not set, count up from zero
      if (!start_num) start_num = 0;
      // If no set, default duration
      if (!duration) duration = 1000;
      // Find number of decimal places
      var decimalPlaces =
        Math.floor(final_num) !== final_num ? final_num.toString().split('.')[1].length || 0 : 0;
      /* jshint ignore:start */
      // complains "Do not use Number as a constructor" but maybe that's needed for test?
      // Test for correct EN locale string conversion
      var goodLocaleStringSupport = new Number(10).toLocaleString() == '10';
      /* jshint ignore:end */
      //Parking count animation
      $({
        countNum: 0
      }).animate({
        countNum: final_num
      }, {
        duration: duration,
        easing: 'swing',
        step: function () {
          // Round to decimal places
          var stepNum = this.countNum.toFixed(decimalPlaces);
          // Add a comma if not a decimal
          if (decimalPlaces == 0 && goodLocaleStringSupport)
            stepNum = parseInt(stepNum).toLocaleString('en');
          $elem.html(stepNum);
        },
        complete: function () {
          $elem.html(original_num);
        }
      });
    }
  }; // end cu_parallax_fx
  var hero_stories_hostname = document.location.hostname == 'localhost' ? 'https://www.chapman.edu/' : 'https://www.chapman.edu/';
  var cu_hero_area = {
    // Configurations
    contentTransitionSpeed: 2000,
    hero_stories_html_dir: hero_stories_hostname.concat('_hero_stories/'),
    // Do not configure these
    videoPlayer: null,
    pastCampaigns: null, // array of campaigns with some data
    currentCampaign: null, // int - the position in the pastCampaigns array
    videoTransitionTimeout: null,
    isChanging: false,
    initialize: function () {
      var requested_story_slug = (location.hash.match(/story-([\w-]+)/) || [])[1]; // undefined, or a string with the story slug
      // Check if we want to start with an older story
      if (requested_story_slug) {
        // Mask the hero space while we load
        $('#mastheadNavigation').hide();
        $('#hero').css('visibility', 'hidden'); // we hide this so it does not fade in on the transition
      } else {
        // Set up the current content
        cu_hero_area.setupContent($('#hero'));
        cu_hero_area.queueExcerptEntrance(100);
      }
      // Fetch past content
      $.getJSON(cu_hero_area.hero_stories_html_dir + 'listing_order.json.txt', function (data) {
        cu_hero_area.currentCampaign = 0;
        cu_hero_area.pastCampaigns = [];
        var keys = data ? Object.keys(data) : [];
        keys.forEach(function (key) {
          /* jshint -W069: ['foo'] is better written in dot notation. */
          // set the slug for this stage
          data[key]['slug'] = data[key]['filename'].substr(0, data[key]['filename'].indexOf('.'));
          // Add to our array
          cu_hero_area.pastCampaigns.push(data[key]);
          // If an older story was requested
          if (requested_story_slug) {
            // Look for the slug filename
            if (data[key]['slug'] == requested_story_slug) {
              cu_hero_area.currentCampaign = cu_hero_area.pastCampaigns.length - 1;
            }
          }
          /* jshint -W069 */
        });
        // If an older story is found and can be loaded
        if (cu_hero_area.currentCampaign != 0) {
          cu_hero_area.processNavigation(cu_hero_area.currentCampaign);
        } else {
          // The older story was requested, but we did not find it. Load default content.
          $('#mastheadNavigation').show();
          $('#hero').css('visibility', '');
          cu_hero_area.setupContent($('#hero'));
          cu_hero_area.queueExcerptEntrance(100);
        }
        if (cu_hero_area.pastCampaigns.length > 1) $('#showOlderContent').removeClass('disabled');
        $('#showOlderContent').hammer().on('tap', function (e) {
          cu_hero_area.processNavigation('older');
          // _gaq.push(['_trackEvent', "Homepage UI Interaction", "Switch hero story", "older"]);
          if (typeof ga !== 'undefined')
            ga('send', 'event', 'Homepage UI Interaction', 'Switch hero story', 'older');
        });
        $('#showNewerContent').hammer().on('tap', function (e) {
          cu_hero_area.processNavigation('newer');
          // _gaq.push(['_trackEvent', "Homepage UI Interaction", "Switch hero story", "newer"]);
          if (typeof ga !== 'undefined')
            ga('send', 'event', 'Homepage UI Interaction', 'Switch hero story', 'newer');
        });
      });
    },
    /***************************************************
     * This function resizes the HTML5 video so that it covers the entire #mastheadBackground element.
     * This simulates the property background-size:cover;
     * This needs to be run every time the browser window is resized.
     ***************************************************/
    adjustVideoSize: function () {
      if (!cu_hero_area.videoPlayer) return false;
      // Get the current video area size
      var container_width = $('#mastheadBackground').outerWidth();
      var container_height = $('#mastheadBackground').outerHeight();
      // use largest scale factor of horizontal/vertical
      var scale_h = container_height / cu_hero_area.videoPlayer.videoHeight;
      var scale_v = container_width / cu_hero_area.videoPlayer.videoWidth;
      var scale = scale_h > scale_v ? scale_h : scale_v;
      var new_video_width = scale * cu_hero_area.videoPlayer.videoWidth;
      var new_video_height = scale * cu_hero_area.videoPlayer.videoHeight;
      // now scale the video
      $('#mastheadVideo').width(new_video_width);
      $('#mastheadVideo').height(new_video_height);
      // and center it by scrolling the video viewport
      $('#mastheadBackground').scrollLeft((new_video_width - container_width) / 2);
      $('#mastheadBackground').scrollTop((new_video_height - container_height) / 2);
    },
    absoluteUrls: function () {
      $('#mastheadVideo source').each(function () {
        videoUrl = $(this).attr('src').replace('/_files', 'http://www.chapman.edu/_files');
        $(this).attr('src', videoUrl);
      });
      if ($('#mastheadImage').length) {
        imageUrl = $('#mastheadImage').attr('src').replace('../', 'http://www.chapman.edu/');
        $('#mastheadImage').attr('src', imageUrl);
        fallbackUrl = $('#hero').css('background-image').replace('localhost:5000', 'www.chapman.edu');
        $('#hero').css('background-image', fallbackUrl);
      }
    },
    setupContent: function ($content) {
      // This fires if working on a development server to change relative image urls to absolute urls
      if (document.location.hostname == 'localhost') cu_hero_area.absoluteUrls();
      // This clears any remaining transitions from the previous content
      if (cu_hero_area.videoTransitionTimeout != null) {
        clearTimeout(cu_hero_area.videoTransitionTimeout);
      }
      cu_hero_area.videoPlayer = $content.find('#mastheadVideo')[0];
      // If video content
      if (
        cu_hero_area.videoPlayer &&
        !cu_window_manager.cannotAutoplayVideo &&
        cu_hero_area.videoPlayer.addEventListener
      ) {
        cu_hero_area.videoPlayer.muted = true; // REQUIRED TO MUTE FOR SAFARI 5.1.3!!!! Does not obey mute property without this line
        cu_hero_area.videoPlayer.addEventListener('canplay', function () {
          // Start the video player
          cu_hero_area.videoPlayer.play();
          // Show the video
          $content.find('#mastheadVideo').fadeIn(1000);
          cu_hero_area.videoTransitionTimeout = setTimeout(function () {
            $content.addClass('video-playing');
          }, 1000);
          cu_hero_area.adjustVideoSize();
        });
      } else {
        // No video content
        $content.removeClass('video-playing');
      }
    },
    queueExcerptEntrance: function (delay_ms) {
      if (!cu_window_manager.useTransitions) return false;
      var $hero = $('#hero');
      $hero.find('.excerpt').css({
        position: 'relative',
        left: '50px',
        opacity: '0'
        // Apply animations to the old outgoing content
      });
      $hero.find('.actions').css({
        position: 'relative',
        left: '100px',
        opacity: '0'
        // Apply animations to the old outgoing content
      });
      setTimeout(function () {
        $hero.find('.excerpt').addClass('fast_transition').css({
          left: '0px',
          opacity: '1'
        });
        $hero.find('.actions').addClass('fast_transition').css({
          left: '0',
          opacity: '1'
        });
      }, delay_ms);
    },
    queueTitleAndExcerptEntrance: function (delay_ms) {
      // Fancy text animations
      if (!cu_window_manager.useTransitions) return false;
      var $hero = $('#hero');
      $('#hero').find('.heading').css({
        position: 'relative',
        left: '50px',
        opacity: '0'
        // Apply animations to the old outgoing content
      });
      $('#hero').find('.subheading').css({
        position: 'relative',
        left: '50px',
        opacity: '0'
        // Apply animations to the old outgoing content
      });
      setTimeout(function () {
        $('#hero').find('.heading').addClass('fast_transition').css({
          left: '0',
          opacity: '1'
        });
        $('#hero').find('.subheading').addClass('fast_transition').css({
          left: '0',
          opacity: '1'
        });
      }, delay_ms);
      cu_hero_area.queueExcerptEntrance(delay_ms * 1.5);
    },
    // Accepts an int ID of a slide, or the string 'older' or 'newer' then transitions to that slide.
    processNavigation: function (input) {
      if (cu_hero_area.isChanging) return false;
      cu_hero_area.isChanging = true;
      var max = cu_hero_area.pastCampaigns.length - 1; // zero based
      var min = 0;
      var direction = 'older'; // default transition
      var current_num = cu_hero_area.currentCampaign;
      if (input == 'newer') {
        direction = 'newer';
        current_num--;
      } else if (input == 'older') {
        direction = 'older';
        current_num++;
      } else if (typeof input === 'number' && input % 1 == 0) {
        current_num = input;
      }
      if (current_num < min) return false;
      if (current_num > max) return false;
      cu_hero_area.currentCampaign = current_num;
      if (cu_window_manager.useTransitions) {
        $('#mastheadNavigation').fadeOut();
      }
      /* jshint -W069: ['foo'] is better written in dot notation. */
      // Check for a local cached copy of this HTML
      if (cu_hero_area.pastCampaigns[current_num]['html']) {
        cu_hero_area.transitionToStory(cu_hero_area.pastCampaigns[current_num]['html'], direction);
      } else {
        var newFile = cu_hero_area.pastCampaigns[current_num]['filename'];
        $.get(cu_hero_area.hero_stories_html_dir + newFile, function (data) {
          cu_hero_area.pastCampaigns[current_num]['html'] = data;
          cu_hero_area.transitionToStory(data, direction);
        });
      }
      // Update the URL
      location.hash = '#story-' + cu_hero_area.pastCampaigns[current_num]['slug'];
      /* jshint +W069 */
    }, // end processNavigation
    transitionToStory: function (raw_html, direction) {
      $new_content = $(raw_html);
      $old_content = $('#hero');
      // Check for extra HTML wrap
      if ($new_content.find('#hero').length > 0) {
        $new_content = $new_content.find('#hero');
      }
      if (cu_window_manager.useTransitions) {
        $new_content
          .css({
            opacity: 0
          })
          .addClass('fast_transition');
        $old_content
          .css({
            opacity: 1,
            'margin-top': '-' + $('#hero').outerHeight() + 'px'
          })
          .addClass('fast_transition');
        $old_content.before($new_content);
        // Need to wait until the transition class is in the DOM
        setTimeout(
          function () {
            $new_content.css({
              opacity: 1
            });
            $old_content.css({
              opacity: 0
            });
          },
          250,
          $new_content,
          $old_content
        );
        // Wait until the transition is complete
        setTimeout(
          function () {
            // Remove the old content from the DOM
            $old_content.remove();
          },
          cu_hero_area.contentTransitionSpeed,
          $old_content
        );
      } else {
        $('#hero').before(raw_html).remove();
      }
      cu_hero_area.setupContent($new_content);
      if (direction == 'newer') {
        cu_hero_area.queueTitleAndExcerptEntrance(cu_hero_area.contentTransitionSpeed / 2.5);
      } else {
        cu_hero_area.queueTitleAndExcerptEntrance(cu_hero_area.contentTransitionSpeed / 3.3);
      }
      var timeToHideNav = cu_window_manager.useTransitions ? cu_hero_area.contentTransitionSpeed : 10;
      // Tasks after the switch is complete
      setTimeout(function () {
        var current_num = cu_hero_area.currentCampaign;
        var max = cu_hero_area.pastCampaigns.length - 1; // zero based
        var min = 0;
        $('#mastheadNavigation').fadeIn();
        if (current_num == min) $('#showNewerContent').addClass('disabled');
        if (current_num == max) $('#showOlderContent').addClass('disabled');
        // Show the buttons if we aren't at an end of the list
        if (current_num != min) $('#showNewerContent').removeClass('disabled');
        if (current_num != max) $('#showOlderContent').removeClass('disabled');
        cu_hero_area.isChanging = false;
      }, timeToHideNav);
    }
  }; // end cu_hero_area
  var cu_admission_area = {
    formTransitionSpeed: 400,
    $admissionCTA: null,
    initialize: function () {
      this.$admissionCTA = $('#admissionCTA');
      this.switchToMode('hide');
      $('.admissionCTA_start').on('click', function (e) {
        cu_admission_area.setupFormHTML(e);
        // cu_admission_area.switchToMode('hide');
        $(this)
          .slideUp(cu_admission_area.formTransitionSpeed)
          .siblings('a')
          .slideUp(cu_admission_area.formTransitionSpeed);
        cu_admission_area.switchToMode('student_type');
      });
      $('input[name="student_type"]').on('change', function () {
        cu_admission_area.switchToMode('student_details');
      });
      this.$admissionCTA.find('#admissionCTA_form').on('submit', function (e) {
        e.preventDefault();
        cu_admission_area.submitForm();
        return false;
      });
    },
    setupFormHTML: function (e) {
      if (!$(e.currentTarget).siblings('#admissionCTA').length) {
        // Move the form here
        $(e.currentTarget).parent().append(cu_admission_area.$admissionCTA.detach());
      }
    },
    switchToMode: function (mode) {
      if (mode == 'student_type') {
        // this.$admissionCTA.css('max-height', '0px');
        this.$admissionCTA.find('#admissionCTA_form').show();
        this.$admissionCTA.find('.student_type_section').slideDown(cu_admission_area.formTransitionSpeed);
        // Uncheck radio button
        this.$admissionCTA.find('input[type="radio"]').prop('checked', false);
      } else if (mode == 'student_details') {
        // this.$admissionCTA.css('max-height', '999px');
        this.$admissionCTA.find('#admissionCTA_form').show();
        this.$admissionCTA.find('.student_details_section').slideDown(cu_admission_area.formTransitionSpeed);
      } else if (mode == 'hide') {
        var $student_type_section = this.$admissionCTA.find('.student_type_section');
        var $student_details_section = this.$admissionCTA.find('.student_details_section');
        $student_type_section.css('height', $student_type_section.height()).hide();
        $student_details_section.css('height', $student_details_section.outerHeight()).hide();
        this.$admissionCTA.find('#admissionCTA_form').hide();
      }
      return;
    },
    submitForm: function () {
      var name = this.$admissionCTA.find('input:text[name=name]').val();
      var email = this.$admissionCTA.find('input:text[name=email]').val();
      var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var is_valid_email = email_regex.test(email);
      if (name == 'Full Name' || name.length < 2) {
        // alert("Please enter your name.");
        // return false;
      }
      if (email == 'Email Address' || email.length < 2 || !is_valid_email) {
        // alert("Please enter a valid email address.");
        // return false;
      }
      this.$admissionCTA.find('.student_type_section').slideUp(cu_admission_area.formTransitionSpeed);
      this.$admissionCTA.find('.student_details_section').slideUp(cu_admission_area.formTransitionSpeed);
      setTimeout(function () {
        cu_admission_area.$admissionCTA.find('#admissionCTA_form').hide();
      }, cu_admission_area.formTransitionSpeed);
      this.$admissionCTA
        .find('.status')
        .hide()
        .html(
          '<b>Thanks, ' +
          name +
          '! </b><br><small>The <a href="http://www.chapman.edu/admission/">CU admissions</a> team will be in touch soon.</small>'
        )
        .fadeIn();
      $('.admissionCTA_start').hide();
      return false;
    }
  }; // end cu_admission_area
  /*
   * Hero Modal Viewer
   * Creates in-page modal view for videos and images.
   *
   * Refactors an existing home-rolled modal, which includes preserving some design quirks
   * where the logic behind them was not explained and the effects of changing them unknown.
   * Prompted by https://github.com/chapmanu/cascade-assets/issues/93.
   */
  var heroModalViewer = (function () {
    // Selectors
    // These are inherited from legacy version and tied to existing stylesheets.
    var HERO_WRAPPER_SELECTOR = 'div#heroWrapper';
    var MODAL_ID = 'heroQuickView';
    var MODAL_CELL_ID = 'heroQuickViewCell';
    var TRIGGER_SELECTOR = 'a[data-quickview-content]';
    var MODAL_OPEN_CLASS = 'heroQuickViewOpen';
    // Data Attribute IDs
    var PREVIOUS_OVERFLOW_DATA_ID = 'hero-previous-overflow';
    var SCROLL_POSITION_DATA_ID = 'hero-scroll-position';
    // jQuery DOM Elements
    var $modal = null;
    var $modalCell = null;
    var $window = null;
    var $html = null;
    var $body = null;
    var $heroWrapper = null;
    // Other Variables
    var isLocked = false;
    // Public Functions
    var initialize = function () {
      // Initalize DOM elements.
      $window = $(window);
      $html = $('html');
      $body = $('body');
      $heroWrapper = $(HERO_WRAPPER_SELECTOR);
      // Build and attach modal to DOM.
      $modal = buildModal();
      $heroWrapper.after($modal);
      // Handle modal events.
      $heroWrapper.on('click', TRIGGER_SELECTOR, function (e) {
        openModal(e);
      });
      $modal.on('click', closeModal);
      $body.on('keyup', function (e) {
        closeModalOnEscape(e);
      });
    };
    // Private Functions
    var buildModal = function () {
      $modal = $('<div />').attr('id', MODAL_ID);
      $modalCell = $('<div />').attr('id', MODAL_CELL_ID);
      $modal.append($modalCell);
      return $modal;
    };
    var openModal = function (e) {
      var MIN_WINDOW_WIDTH = 640;
      var modifierKey = e.metaKey || e.ctrlKey;
      var modalContent = $(e.currentTarget).attr('data-quickview-content');
      // Do not intercept URLs that are alt clicked or in small windows.
      if (modifierKey) {
        return;
      } else if ($window.width() <= MIN_WINDOW_WIDTH) {
        // Do not intercept in small windows.
        return;
      } else if (!modalContent) {
        // Do not intercept if content is empty.
        return;
      } else {
        // Go!
        fadeInModal(modalContent, 500);
        // Disable redirect.
        e.preventDefault();
        return false;
      }
    };
    var fadeInModal = function (modalContent, milliSecDuration) {
      var cellHeight = $window.height() + 'px';
      var cellWidth = $window.width() + 'px';
      $modalCell.append(modalContent).css('height', cellHeight).css('width', cellWidth);
      $modal.fadeIn(milliSecDuration);
      lockScroll();
      $body.addClass(MODAL_OPEN_CLASS);
    };
    var closeModal = function () {
      $modal.fadeOut(40, function () {
        $modalCell.empty();
      });
      unlockScroll();
      $body.removeClass(MODAL_OPEN_CLASS);
    };
    var lockScroll = function () {
      // Retain settings for later.
      var scrollPosition = [
        document.documentElement.scrollLeft || document.body.scrollLeft,
        document.documentElement.scrollTop || document.body.scrollTop
      ];
      $html.data(SCROLL_POSITION_DATA_ID, scrollPosition);
      $html.data(PREVIOUS_OVERFLOW_DATA_ID, $html.css('overflow'));
      // Lock scroll position.
      // IE7 requires applying this to html rather than body.
      isScrollLocked = true;
      $html.css('overflow', 'hidden');
      // Note: this needs to be window not $window.
      window.scrollTo(scrollPosition[0], scrollPosition[1]);
    };
    var unlockScroll = function () {
      if (!isScrollLocked) {
        return false;
      }
      var previousOverflow = $html.data(PREVIOUS_OVERFLOW_DATA_ID);
      var scrollPosition = $html.data(SCROLL_POSITION_DATA_ID);
      $html.css('overflow', previousOverflow);
      // Note: this needs to be window not $window.q
      window.scrollTo(scrollPosition[0], scrollPosition[1]);
    };
    var closeModalOnEscape = function (e) {
      if (e.which == 27) {
        closeModal();
      }
    };
    // Public API
    return {
      initialize: initialize
    };
  })(); // End heroModalViewer.
})(jQuery);
// Define Lazybind
(function ($) {
  $.fn.lazybind = function (event, fn, timeout, abort) {
    var timer = null;
    $(this).bind(event, function (e) {
      var ev = e;
      timer = setTimeout(function () {
        fn(ev);
      }, timeout);
    });
    if (abort == undefined) {
      return;
    }
    $(this).bind(abort, function () {
      if (timer != null) {
        clearTimeout(timer);
      }
    });
  };
})(jQuery);
// Object.keys pollyfill for older IE
if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
      hasDontEnumBug = !{
        toString: null
      }.propertyIsEnumerable('toString'),
      dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ],
      dontEnumsLength = dontEnums.length;
    return function (obj) {
      if ((typeof obj !== 'object' && typeof obj !== 'function') || obj === null)
        throw new TypeError('Object.keys called on non-object');
      var result = [];
      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) result.push(prop);
      }
      if (hasDontEnumBug) {
        for (var i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
        }
      }
      return result;
    };
  })();
}
// Array.forEach pollyfill for older IE
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (fun /*, thisp*/) {
    var len = this.length;
    if (typeof fun != 'function') throw new TypeError();
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in this) fun.call(thisp, this[i], i, this);
    }
  };
  if ($($elem.attr('data-count').length)) {
    var original_num = $elem.attr('data-count');
  }
}

// FIX MOBILE UNDERGRADUATE SECTION
if ($(window).width() < 678 && $('.homepage').length > 0) {
  $(window).on('scroll', function () {
    $('#undergraduateAdmission').find('.fade-elem').each(function (i) {
      var el = $(this);
      setTimeout(function () {
        el.animate({
          opacity: '1'
        }, 1000, 'linear');
      }, 600 * i);
    });
    $('#undergraduateAdmission').find('.bigstat').each(function (i) {
      var el = $(this);
      if ($(el.attr('data-count').length)) {
        var original_num = $(el).attr('data-count');
        $(el).html(original_num);
      }
      setTimeout(function () {
        el.animate({
          opacity: '1'
        }, 1000, 'linear');
      }, 600 * i);
    });
  });
}



