$(function () {
  if ($(".personnel-widget").length) {
    // alert("personnel widget");
    console.log("detected personnel widget");
    personnelCarousel();
    $(".personnel-widget").each(function () {
      // IF NO 'LEARN MORE' LINK, REMOVE <hr>
      if ($(this).find(".personnel-widget__link-bottom a").length <= 0) {
        $(this).find("hr").hide();
      }
    });

    $(".personnel-widget").mouseleave(function () {
      // $(this)
      //   .parent()
      //   .parent()
      //   .find(".personnel-widget--flipped")
      //   .removeClass("personnel-widget--flipped");
      // setTimeout(function () {
      //   $(".personnel-widget").removeClass("personnel-widget--flipped");
      //   console.log("removing flip");
      // }, 2000);
    });
  }

  $(".personnel-widget").each(function () {
    var parent = $(this);
    $(this)
      .find(".curl")
      .click(function () {
        $(this).parent().parent().addClass("personnel-widget--flipped");
      });

    $(".personnel-widget__back").click(function (e) {
      if ($(e.target).is("p")) return; // do not flip to front if click p
      if ($(e.target).is("a")) return; // do not flip to front if click href
      $(this).parent().removeClass("personnel-widget--flipped");
    });

    $(".personnel-widget--flipped").mouseleave(function () {
      $(this).removeClass("personnel-widget--flipped");
    });
  });
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
