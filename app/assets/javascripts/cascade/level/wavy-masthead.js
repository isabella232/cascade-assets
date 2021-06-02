$(function () {
  if ($(".wavy-masthead").length) {
    console.log("wavy masthead");
    var vid = $(".wavy-masthead video");

    if (!$(vid).get(0).paused) {
      vid.attr("data-video-state", "playing");
    }

    $(".toggle-video").on("click keydown", function (event) {
      if (accessibleClick(event)) {
        togglePlay();
      }
    });

    wavyMastheadSlider();
  }
});
function fetchCuratorImages() {
  $.ajax({
    url: "https://api.curator.io/v1/feeds/c91835ec-e439-42c2-bd46-e5fb3899afe2/posts?api_key=11a4445f-6005-4040-9ff2-fd90d3aaa8a6",
    type: "GET",
    success: manipulateCuratorImages,
    error: function (data, status, error) {
      console.log(
        "%c ERROR: level/wavy-masthead.js - could not load curator.io images" +
          data.responseText.error,
        "background: #222; color: #bada55"
      );
      $(".wavy-masthead__photos picture").addClass("fade-in");
    },
  });
}

$(document).on(".wavy-masthead__photos img src", function () {
  console.log("src changed");
});

function manipulateCuratorImages(data) {
  $(".wavy-masthead__photos picture").each(function (index, value) {
    $(this).find("img").attr("src", data.posts[index].image);
    $(this).find("img").attr("data-post", data.posts[index].id);
  });
  $(".wavy-masthead__photos picture img").load(function () {
    var imageObj = $(this);
    if (!(imageObj.width() == 1 && imageObj.height() == 1)) {
      $(this).closest("picture").addClass("fade-in");
    }
  });
  $('img[alt=""]').each(function (index, value) {
    $(this).attr("alt", data.posts[index].text);
  });
}

function togglePlay() {
  var vid = $(".wavy-masthead video");

  var container = $(".wavy-masthead__container");

  // IF VIDEO IS NOT PAUSED PAUSED
  if ($(vid).get(0).paused) {
    $(container).attr("data-video-state", "playing");
    $("#wavy-masthead__toggle--play").addClass("hidden");
    // $("#wavy-masthead__toggle--play").hide();
    // $("#wavy-masthead__toggle-pause-button").show();
    $(vid).trigger("play");
  } else {
    // IF VIDEO IS PAUSED PAUSED
    $(container).attr("data-video-state", "paused");
    // $("#wavy-masthead__toggle-pause-button").hide();
    // $("#wavy-masthead__toggle--play").show();
    $(vid).trigger("pause");
  }
}
function ieObjectFitFallback() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  if (
    msie > 0 ||
    (!!navigator.userAgent.match(/Trident.*rv\:11\./) &&
      $(".wavy-masthead__photo-grid img").length)
  ) {
    $(".wavy-masthead__photo-grid img, .ie__wavy-masthead__photos img").each(
      function () {
        var t = $(this),
          s = "url(" + t.attr("src") + ")",
          p = t.parent(),
          d = $("<div class='ie__fallback--object-fit'></div>");
        t.hide();
        p.append(d);
        d.css({
          height: 150,
          "background-size": "cover",
          "background-repeat": "no-repeat",
          "background-position": "center",
          "background-image": s,
        });
      }
    );
    $(".ie__fallback-object-fit:first-of-type").css("height", "100%");
  }
}
// KEYS 🎹
function accessibleClick(event) {
  if (event.type === "click") {
    togglePlay();
    return true;
  } else if (event.type === "keypress") {
    var code = event.charCode || event.keyCode;
    if (code === 32 || code === 13) {
      togglePlay();
      return true;
    }
  } else {
    return false;
  }
}

function wavyMastheadSlider() {
  // const masthead = $(".wavy-masthead[data-slider='true']");
  if ($(".wavy-masthead__slider").length) {
    console.log("slider");
    var slider = $(".wavy-masthead__slider")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        infinite: true,
        adaptiveHeight: true,
        accessibility: true,
        autoplay: true,
        autoplaySpeed: 10000,
        appendDots: $(".wavy-masthead__slider-container"),
        dotsClass: "slick-dots wavy-masthead__slider-dots",
      });
    slider;

    // $(".autoplay-wrapper").on("click keydown", function (event) {
    //   if (accessibleClick(event)) {
    //     console.log("disabling autoplay");
    //     $(".wavy-masthead__slider").slick("slickPause");
    //   }
    // });

    // prepend Slider-level pause button (stops autoplay on the slide-level; different from individual slide pause)

    // if ($("#autoplay-toggle").length <= 0) {
    console.log("adding autoplay toggle to dots");
    $("ul:first-of-type.wavy-masthead__slider-dots").prepend(
      '<li id="autoplay-enable-wrapper" class="autoplay-toggle" aria-role="button" aria-label="Disable slideshow" title="Disable Slideshow"><svg id="autoplay-enable" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="pause-circle" class="svg-inline--fa fa-pause-circle fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M218 160h-20c-3.3 0-6 2.7-6 6v180c0 3.3 2.7 6 6 6h20c3.3 0 6-2.7 6-6V166c0-3.3-2.7-6-6-6zm96 0h-20c-3.3 0-6 2.7-6 6v180c0 3.3 2.7 6 6 6h20c3.3 0 6-2.7 6-6V166c0-3.3-2.7-6-6-6zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 464c-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216z"/></svg><li class="autoplay-toggle" id="autoplay-disable-wrapper" style="display:none;" aria-label="Enable slideshow" title="Enable Slideshow"><svg id="autoplay-disable"  xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="play-circle" class="svg-inline--fa fa-play-circle fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zM40 256c0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216zm331.7-18l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM192 335.8V176.9c0-4.7 5.1-7.6 9.1-5.1l134.5 81.7c3.9 2.4 3.8 8.1-.1 10.3L201 341c-4 2.3-9-.6-9-5.2z"/></svg></li>'
    );
    // }

    $("#autoplay-enable-wrapper").on("click keydown", function (event) {
      if (accessibleClick(event)) {
        console.log("disabling autoplay");
        $(".wavy-masthead__slider").slick("slickPause");
        $("#autoplay-enable-wrapper").hide();
        $("#autoplay-disable-wrapper").show();
      }
    });
    $("#autoplay-disable-wrapper").on("click keydown", function (event) {
      if (accessibleClick(event)) {
        console.log("disabling autoplay");
        $(".wavy-masthead__slider").slick("slickPlay");
        $("#autoplay-disable-wrapper").hide();
        $("#autoplay-enable-wrapper").show();
      }
    });
  }
}

function initSlider(selector, options) {
  if ($.fn.slick) {
    $(selector).slick(options);
  } else {
    setTimeout(function () {
      initSlider(selector, options);
    }, 500);
  }
}
