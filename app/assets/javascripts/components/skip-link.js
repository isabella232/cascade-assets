$(document).ready(function () {
  $('.skip-link').on("keydown click", function (e) {
    //Spacebar or Enter Key
    if ((e.keyCode === 32 || e.keyCode === 13) || e.type == "click") {
      var scrollTarget = $('#main').length ? $('#main').first() : $('h1').first();
      if (scrollTarget.is(":hidden")) {
        if ($('#scrollToMe').length == 0) {
          scrollTarget.after("<div id='scrollToMe'></div>");
        }
        scrollTarget = $("#scrollToMe");
      }
      $('html,body').animate({ scrollTop: scrollTarget.offset().top }, 1000);
      scrollTarget.attr('tabindex', -1).on('blur focusout', function () {
        // when focus leaves this element, remove the tabindex attribute
        $(this).removeAttr('tabindex');
      }).focus(); // focus on the content container
      return false;
    }
  });
});

