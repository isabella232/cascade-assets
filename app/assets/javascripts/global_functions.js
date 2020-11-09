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
