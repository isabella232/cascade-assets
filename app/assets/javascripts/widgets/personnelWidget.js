$(function () {
  if ($(".personnel-widget").length) {
    alert("personnel widget");
    console.log("detected personnel widget");
    personnelCarousel();
    $(".personnel-widget").each(function () {
      // IF NO 'LEARN MORE' LINK, REMOVE <hr>
      if ($(this).find(".personnel-widget__link-bottom a").length <= 0) {
        $(this).find("hr").hide();
      }
    });
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
