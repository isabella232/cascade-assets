$(function () {
  if ($(".grid-block-widget").length) {
    $(".grid-block-widget__text").each(function () {
      var textHeight = $(this).height();
      $(this).attr("data-height", textHeight);
      $(this).addClass("grid-block-widget__text--truncated");

      if ($(this).attr("data-height") >= 150) {
        $(this)
          .parent()
          .append(
            '<span tabindex="0" class="grid-block-widget__reveal grid-block-widget__reveal--more">More</span>'
          );
      }
    });
    $(".grid-block-widget__reveal").on("keypress", function (e) {
      if (a11yClick(event) === true) {
        parent = $(this).parent();
        $(parent)
          .find(".grid-block-widget__text")
          .toggleClass("grid-block-widget__text--truncated");

        $(parent)
          .find(".grid-block-widget__reveal")
          .toggleClass("grid-block-widget__text--more")
          .toggleClass("grid-block-widget__reveal--less");

        $(this).text(function (i, text) {
          return text === "More" ? "Less" : "More";
        });
      }
    });
  }

  function a11yClick(event) {
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
});
