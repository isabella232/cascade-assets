$(function () {
  if ($(".grid-block-widget").length) {
    $(".grid-block-widget__text").each(function () {
      var textHeight = $(this).height();
      $(this).attr("data-height", textHeight);
      $(this).addClass("grid-block-widget__text--truncated");

      if ($(this).attr("data-height") >= 150) {
        $(this).parent().find(".grid-block-widget__reveal--more").show();
      }
    });
    $(".grid-block-widget__reveal--more").on("click keydown", function (e) {
      if (accessibleClick(event)) {
        parent = $(this).parent();
        $(parent)
          .find(".grid-block-widget__text")
          .removeClass("grid-block-widget__text--truncated")
          .addClass("grid-block-widget__text--revealed");
        $(this).hide();
        $(".grid-block-widget__reveal--less").show();
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
        $(".grid-block-widget__reveal--more").show();
      }
    });
  }
});
