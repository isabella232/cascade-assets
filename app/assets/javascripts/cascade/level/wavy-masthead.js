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
    $(".wavy-masthead__slider").not(".slick-initialized").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      infinite: true,
      adaptiveHeight: true,
      accessibility: true,
    });
  }
}
