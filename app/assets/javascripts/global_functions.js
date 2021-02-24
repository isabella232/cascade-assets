var accessibleClick = function (event) {
  var code = event.charCode || event.keyCode,
    type = event.type;

  if (type === "click") {
    console.log("click");
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

// IE, Polyfills
function ieObjectFitFallback(imageSelector) {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ");
  if (
    msie > 0 ||
    (!!navigator.userAgent.match(/Trident.*rv\:11\./) &&
      $(".homepage-masthead__photo-grid img").length)
  ) {
    $(imageSelector).each(function () {
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
        "background-image": s,
      });
    });
    $(imageSelector).css("height", "100%");
  }
}

// usage:
// function ShowIEAlert(){
//   if(isIE()){
//      console.log("User is using IE");
//   }
// }
function isIE() {
  const ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
  const msie = ua.indexOf("MSIE "); // IE 10 or older
  const trident = ua.indexOf("Trident/"); //IE 11

  return msie > 0 || trident > 0;
}
