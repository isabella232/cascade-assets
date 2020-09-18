$(document).ready(function () {
  $(".widget-slides").lightSlider({
    gallery: false,
    item: 1,
    thumbItem: 9,
    slideMargin: 0,
    speed: 500,
    pause: 10000,
    auto: true,
    loop: true,
    keyPress: true,
    pauseOnHover: false,
    adaptiveHeight: true,
    // useCSS: true,
    onSliderLoad: function () {
      $(".widget-slides").removeClass("cS-hidden");
    }
  });

  // IE Fallback for widget-slides img { object-fit: } CSS property 
  if (document.documentMode || /Edge/.test(navigator.userAgent)) {
    $('.image-slider-wrapper img').each(function () {
      var t = $(this),
        s = 'url(' + t.attr('src') + ')',
        p = t.parent(),
        d = $('<div></div>');

      p.append(d);
      d.css({
        'height': t.parent().css('height'),
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'background-position': '50% 20%',
        'background-image': s
      });
      t.hide();
    });
  }


  clickPause();
  clickPlay();


  $('.cd-hero-pause').keydown(function (e) {
    if (e.which == 13) {//Enter key pressed
      pause()
    }
  });

  $('.cd-hero-play').keypress(function (e) {
    if (e.which == 13) {//Enter key pressed
      play();
    }
  });

  function clickPause() {
    $('.cd-hero-pause').on('click', function (event) {
      pause();
    });
  }

  function pause() {

    $('.cd-hero-pause').hide();
    $('.cd-hero-play').show();

    // $('video').trigger($('video').prop('paused') ? 'play' : 'pause');

    // $('.brochure-masthead *').removeClass('autoplay').addClass('masthead-paused')

    $('.brochure-masthead * ').filter('.autoplay').addClass('masthead-paused').removeClass('.autoplay');

    $(".widget-slides").lightSlider({
      auto: false,
    });




    if ($('video').length) {
      var vid = $("video");
      if ($(vid).get(0).paused) {
        vid.removeClass('homepage-masthead__play-video--paused')
        $('#homepage-masthead__play-button').hide();
        $('#homepage-masthead__pause-button').show();
        $(vid).trigger('play');
      } else {
        vid.addClass('homepage-masthead__video--paused')
        $('#homepage-masthead__pause-button').hide();
        $('#homepage-masthead__play-button').show();
        $(vid).trigger('pause');
      }
    }
  }
  function clickPlay() {

    $('.cd-hero-play').on('click', function (event) {
      play();

    });
  }

  function play() {
    $('.cd-hero-play').hide();
    $('.cd-hero-pause').show();
    // $('video').trigger($('video').prop('paused') ? 'play' : 'pause');

    // $('.brochure-masthead *').removeClass('autoplay').addClass('masthead-paused')

    $('.brochure-masthead').each(function () {
      if ($(this).hasClass('masthead-paused'))
        $(this).addClass('autoplay').removeClass('masthead-pausd')
    })
    if ($('video').length) {
      var vid = $("video");
      if ($(vid).get(0).paused) {
        vid.removeClass('homepage-masthead__play-video--paused')
        $('#homepage-masthead__play-button').hide();
        $('#homepage-masthead__pause-button').show();
        $(vid).trigger('play');
      } else {
        vid.addClass('homepage-masthead__video--paused')
        $('#homepage-masthead__pause-button').hide();
        $('#homepage-masthead__play-button').show();
        $(vid).trigger('pause');
      }
    }
    $(".widget-slides").lightSlider({
      auto: false,
    });

  }
});