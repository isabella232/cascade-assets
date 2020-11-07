$(function () {
  $(".grid-block-widget__text").each(function () {
    var textHeight = $(this).height();
    $(this).attr("data-height", textHeight);
    $(this).addClass("grid-block-widget__text--truncated");

    if ($(this).attr("data-height") >= 150) {
      $(this)
        .parent()
        .append(
          '<span class="fas fa-chevron-down"></span> <span class="grid-block-widget__reveal">More</span>'
        );
    }
  });
  $(".grid-block-widget__reveal").click(function () {
    parent = $(this).parent();
    $(parent)
      .find(".grid-block-widget__text")
      .toggleClass("grid-block-widget__text--truncated");

    $(this).text(function (i, text) {
      return text === "More" ? "Less" : "More";
    });
  });
});
