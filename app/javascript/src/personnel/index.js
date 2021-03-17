$(function () {
  if ($(".personnel-widget__container").length) {
    normalizeHeights();

    $(".personnel-widget").each(function () {
      // IF NO 'LEARN MORE' LINK, REMOVE <hr>
      if ($(this).find(".personnel-widget__link-bottom a").length <= 0) {
        $(this).find("hr").hide();
      }
    });
  }
});
function normalizeHeights() {
  // Normalizes height discrepancies on grid block
  $(".personnel-widget__container").each(function () {
    // Get an array of all element heights
    var elementHeights = $(this)
      .find(".personnel-widget__title")
      .map(function () {
        return $(this).height();
      })
      .get();
    // Math.max takes a variable number of arguments
    // `apply` is equivalent to passing each height as an argument
    var tallest = Math.max.apply(null, elementHeights);
    // Set each height to the max height
    $(this).find(".personnel-widget__title").css("min-height", tallest);
  });
}

export default personnel;
