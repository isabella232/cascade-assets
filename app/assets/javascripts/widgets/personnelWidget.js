$(function () {
  if ($(".personnel-widget").length) {
    flipCard();
    personnelCarousel();
    revealMoreButton();
  }
});
function personnelCarousel() {
  if ($(".personnel-widget__carousel").length) {
    console.log("detected personnel carousel");
    $(".personnel-widget__carousel").slick({
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
  }
}
function flipCard() {
  $(".personnel-widget").each(function () {
    var parent = $(this);
    $(this)
      .find(".curl")
      .on("click keydown", function (e) {
        if (accessibleClick(event)) {
          $(this).parent().parent().addClass("personnel-widget--flipped");
        }
      });
    $(".personnel-widget__back").on("click keydown", function (e) {
      if ($(e.target).is("a")) return; // do not flip to front if click href
      if (accessibleClick(event)) {
        $(this).parent().removeClass("personnel-widget--flipped");
      }
    });
    $(".personnel-widget--flipped").mouseleave(function () {
      $(this).removeClass("personnel-widget--flipped");
    });
  });
}
function revealMoreButton() {
  // Handle multiple Personnel Widgets edge case
  $.each($(".personnel-widget__wrapper"), function (ind) {
    var buttonClickCounter = 0;
    $(this).attr("id", "personnel-widget__wrapper__" + parseInt(ind + 1));
    var currentWrapper = "#" + $(this).attr("id");
    var currentShowMoreButton = $(currentWrapper).find(
      ".personnel-widget__show-more"
    );
    var currentCards = $(currentWrapper).find(".personnel-widget"); // current instance of wrapper's cards
    $(currentShowMoreButton).attr(
      "id",
      "personnel-widget__show-more__" + parseInt(ind + 1)
    );

    $(currentShowMoreButton).on("click keydown", function (e) {
      if (accessibleClick(event)) {
        buttonClickCounter += 1;

        if (buttonClickCounter <= 1) {
          $(currentCards).slice(4, 8).show();
        }
        if (buttonClickCounter > 1) {
          $(currentCards).show();
          $(currentShowMoreButton).hide();
        }

        var currentHidden = $(currentWrapper).find(".personnel-widget:hidden")
          .length;
        var currentVisible = $(currentWrapper).find(".personnel-widget:visible")
          .length;

        console.log("current hidden: " + currentHidden);
        console.log("current visible: " + currentVisible);

        $(currentShowMoreButton).attr("hidden-cards", currentHidden);
        $(currentShowMoreButton).attr("data-counter", buttonClickCounter);

        if (currentHidden == 0) {
          console.log("checking currentHidden");
          $(currentShowMoreButton).hide();
        }

        if ($(currentHidden) == 0) {
          console.log("checking currentHidden");
          $(currentShowMoreButton).hide();
        }
      }
    });
  });
}
var accessibleClick = function (event) {
  var code = event.charCode || event.keyCode,
    type = event.type;
  if (type === "click") {
    return true;
  } else if (type === "keydown") {
    if (code === 32 || code === 13) {
      event.preventDefault();
      return true;
    }
  } else {
    return false;
  }
};
