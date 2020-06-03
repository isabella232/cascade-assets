// object-fit fallback for ie internet explorer
$(function () {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  if (
    msie > 0 ||
    (!!navigator.userAgent.match(/Trident.*rv\:11\./) &&
      $(".contact-profile-widget__img").length)
  ) {
    $("img.contact-profile-widget__img").each(function () {
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
        "background-image": s
      });
    });
  }
});
