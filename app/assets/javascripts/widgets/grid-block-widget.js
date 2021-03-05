$(function () {
  if ($(".grid-block-widget").length) {
    gridBlockWidget();
    gridBlockCarousel();
    if (isIE()) {
      console.log("internet explorer");
      $(".grid-block-widget img").each(function () {
        console.log("detected ie -- changing object-fit to background images");
        var t = jQuery(this),
          s = "url(" + t.attr("src") + ")",
          p = t.parent(),
          parentClasses = t.attr("class"),
          d = jQuery(
            "<div class='ie__fallback--object-fit grid-block-widget__image'></div>"
          );
        console.log("parentClasses" + parentClasses);
        p.prepend(d);
        d.css({
          "min-height": "200px",
          "background-size": "cover",
          "background-repeat": "no-repeat",
          "background-position": "50% 50%",
          "background-image": s,
        });
        d.attr("class", parentClasses);
        // $(".grid-block-widget__title").css("max-width", "200px");
        t.remove();
      });
      $(".grid-block-widget__reveal--more").on("click keydown", function (e) {
        parent = $(this).parent();
        $(parent)
          .find(".grid-block-widget__text")
          .removeClass("grid-block-widget__text--truncated")
          .addClass("grid-block-widget__text--revealed");
        $(this).hide();
        $(parent).find(".grid-block-widget__reveal--less").show();
        $(parent)
          .find(".grid-block-widget__text")
          .attr("aria-expanded", "true");
      });
    }
  }
});

function calculateDataHeight() {
  console.log("calculating text data height");
  $(".grid-block-widget__text").each(function () {
    $(this).addClass("grid-block-widget__text--truncated");
    var scrollHeight = $(this)[0].scrollHeight;
    $(this).attr("data-scroll-height", scrollHeight);
    $(this)
      .parent(".grid-block-widget")
      .addClass("grid-block-widget--text-overflow");
    if ($(this).attr("data-scroll-height") >= 158) {
      $(this).parent().find(".grid-block-widget__reveal--more").show();
    }
  });
}

function gridBlockWidget() {
  calculateDataHeight();
  var buttonClickCounter = 0;
  $(".grid-block-widget__container").each(function () {
    // IDs are assigned via velocity format
    var currentWidgetContainer = $(this).attr("id");
    var loadMoreButtonButton = " + .grid-block-widget__button";
    var currentButton = "#" + currentWidgetContainer + loadMoreButtonButton;
    var gridBlockWidgetColumns = $("#columns").html($(this).val());
    $(currentButton).on("click keydown", function (e) {
      if (accessibleClick(event)) {
        console.log("clicked");
        console.log("current widget container: #" + currentWidgetContainer);
        console.log("current widget button: " + currentButton);
        buttonClickCounter += 1;
        console.log("button click counter " + buttonClickCounter);
        var currentVisible = $("#" + currentWidgetContainer).find(
          ".grid-block-widget:visible"
        ).length;
        var currentHidden = $("#" + currentWidgetContainer).find(
          ".grid-block-widget:hidden"
        ).length;
        console.log("current hidden: " + currentHidden);
        var dataColumns = $("#" + currentWidgetContainer).data("columns");
        var numToReveal = $("#" + currentWidgetContainer).data("columns") * 3;
        console.log("numtoreveal: " + numToReveal);
        $(".grid-block-widget__reveal--less").hide();
        if (buttonClickCounter <= 1) {
          console.log("parent: " + currentWidgetContainer);
          $("#" + currentWidgetContainer)
            .find(".grid-block-widget")
            .slice(dataColumns, numToReveal)
            .show();
          $(currentButton).text("Show All");
        }
      }
      if (buttonClickCounter > 1) {
        $(currentButton).fadeOut();
        $("#" + currentWidgetContainer)
          .find(".grid-block-widget")
          .show();
      }
      calculateDataHeight();
    });
  });
  clickHandlers();
}

function clickHandlers() {
  $(".grid-block-widget__reveal--more").on("click keydown", function (e) {
    if (accessibleClick(event)) {
      parent = $(this).parent();
      $(parent)
        .find(".grid-block-widget__text")
        .removeClass("grid-block-widget__text--truncated")
        .addClass("grid-block-widget__text--revealed");
      $(this).hide();
      $(parent).find(".grid-block-widget__reveal--less").show();
      $(parent).find(".grid-block-widget__text").attr("aria-expanded", "true");
    }
  });
  $(".grid-block-widget__reveal--less").on("click keydown", function (e) {
    if (accessibleClick(event)) {
      parent = $(this).parent();
      $(parent)
        .find(".grid-block-widget__text")
        .addClass("grid-block-widget__text--truncated")
        .removeClass("grid-block-widget__text--revealed");
      $(this).hide();
      $(parent).find(".grid-block-widget__reveal--more").show();
      $(parent).find(".grid-block-widget__text").attr("aria-expanded", "false");
    }
  });
}

function gridBlockCarousel() {
  $(".grid-block-widget__container--rotate").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: true,
    // accessibility: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });
  $(".one-column .grid-block-widget__container--rotate").slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });
}

function adjustCarouselButtonHeight() {
  $(".one-column .grid-block-widget__container--rotate").each(function () {
    var imgHeight = $(this).find(".grid-block-widget__image").height();
    var buttonHeight = imgHeight / 2;
    var slickButton = $(this)
      .find("button.slick-arrow")
      .css("top", buttonHeight);
  });
}

function ieObjectFitFallback() {
  console.log("internet explorer");
  $(".grid-block-widget img").each(function () {
    console.log("detected ie -- changing object-fit to background images");
    var t = jQuery(this),
      s = "url(" + t.attr("src") + ")",
      p = t.parent(),
      parentClasses = t.attr("class"),
      d = jQuery(
        "<div class='ie__fallback--object-fit grid-block-widget__image'></div>"
      );
    console.log("parentClasses" + parentClasses);
    p.prepend(d);
    d.css({
      "min-height": "200px",
      "background-size": "cover",
      "background-repeat": "no-repeat",
      "background-position": "50% 50%",
      "background-image": s,
    });
    d.attr("class", parentClasses);
    t.remove();
  });
}
$(window).load(function () {
  adjustCarouselButtonHeight();
  $("button.slick-arrow").on("click keydown", function (e) {
    if (accessibleClick(event)) {
      $(".grid-block-widget__reveal--less").trigger("click");
    }
  });
  $("button.slick-prev").on("keydown", function (e) {
    if (accessibleClick(event)) {
      $("button.slick-prev").trigger("click");
    }
  });
  $("button.slick-next").on("keydown", function (e) {
    if (accessibleClick(event)) {
      $("button.slick-next").trigger("click");
    }
  });
  normalizeHeights();
  calculateDataHeight();
});

function normalizeHeights() {
  $(".grid-block-widget__container").each(function () {
    // Get an array of all element heights
    var elementHeights = $(this)
      .find(".grid-block-widget")
      .map(function () {
        return $(this).height();
      })
      .get();
    // Math.max takes a variable number of arguments
    // `apply` is equivalent to passing each height as an argument
    var tallest = Math.max.apply(null, elementHeights);
    // Set each height to the max height
    $(this).find(".grid-block-widget").css("min-height", tallest);
  });
  hidePaginationButton();
}

function hidePaginationButton() {
  $(".grid-block-widget__container").each(function () {
    var hidden = $(this).find(".grid-block-widget:hidden").length;
    var button = $(this).find(".grid-block-widget__button");
    console.log("hidden " + hidden);
    var currentWidgetContainer = $(this).attr("id");
    var loadMoreButtonButton = " + .grid-block-widget__button";
    var currentButton = "#" + currentWidgetContainer + loadMoreButtonButton;
    if ($(this).find(".grid-block-widget:hidden").length <= 0) {
      $(currentButton).remove();
    }
  });
}
