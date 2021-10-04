$(function () {
  if ($(".wavy-masthead").length) {

    var vid = $(".wavy-masthead video");
    var container = $(".wavy-masthead__container");

    toggleVideoPlay();
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
    return true;
  } else if (event.type === "keypress") {
    var code = event.charCode || event.keyCode;
    if (code === 32 || code === 13) {
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
        adaptiveHeight: false,
        accessibility: true,
        autoplay: true,
        autoplaySpeed: 10000,
        appendDots: $(".wavy-masthead__slider-container"),
        dotsClass: "slick-dots wavy-masthead__slider-dots",
        pauseOnHover: true,
      });
    slider;

    var bgColor = $(".wavy-masthead__slider").attr("data-bg-color");
    $(".slick-dots").attr("data-bg-color", bgColor);
    $(
      "ul:first-of-type.wavy-masthead__slider-dots li:not(.autoplay-toggle"
    ).click(function () {
      // don't need each (click does this internally)
      $(this)
        .addClass("slick-active wavy-masthead__active-bullet") //add cell-selected class to a
        .parent() //go back to li
        .siblings() //look at siblings
        .find(".slick-active") //find cell-selected elements
        .removeClass("slick-active wavy-masthead__active-bullet"); //remove the class
    });

    $(".wavy-masthead__slider-dots li, .toggle-video").on(
      "click keydown",
      function (event) {
        if (accessibleClick(event)) {
          console.log("disabling autoplay");
          $(".wavy-masthead__slider").slick("slickPause");
        }
      }
    );
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

function toggleVideoPlay() {
  var vid = $(".wavy-masthead video");
  var container = $(".wavy-masthead__container");

  $(".wavy-masthead__toggle--pause").on("click keydown", function (event) {
    if (accessibleClick(event)) {
      $(container).attr("data-video-state", "paused");
      $(vid).trigger("pause");
      console.log("pausing video");
    }
  });

  $(".wavy-masthead__toggle--play").on("click keydown", function (event) {
    if (accessibleClick(event)) {
      $(container).attr("data-video-state", "playing");
      $(vid).trigger("play");
      console.log("playing video");
    }
  });
}
