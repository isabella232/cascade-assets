$(function () {
  if ($(".grid-block-widget").length) {
    $(".grid-block-widget__text").each(function () {
      var textHeight = $(this).height();
      $(this).attr("data-height", textHeight);
      $(this).addClass("grid-block-widget__text--truncated");

      $(this)
        .parent(".grid-block-widget")
        .addClass("grid-block-widget--text-overflow");
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
        $(parent).find(".grid-block-widget__reveal--less").show();
        $(parent)
          .find(".grid-block-widget__text")
          .attr("aria-expanded", "true");
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
        $(parent)
          .find(".grid-block-widget__text")
          .attr("aria-expanded", "false");
      }
    });
  }
});
