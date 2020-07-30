$(window).on("load resize", function (e) {
  if ($(".one-column-template .text-with-cta-widget--default").length) {
    console.log('chaning --default text with cta')
    if ($(window).width() > 905) {
      $('.one-column-template .text-with-cta-widget--default').each(function () {
        var buttons = $(this).find('.text-with-cta__buttons')
        var title = $(this).find('.text-with-cta__title')
        var text = $(this).find('.text-with-cta__text')
        buttons.detach().appendTo(title)
      })
    }
    else {
      $('.one-column-template .text-with-cta-widget--default').each(function () {
        var buttons = $(this).find('.text-with-cta__buttons')
        var title = $(this).find('.text-with-cta__title')
        var text = $(this).find('.text-with-cta__text')
        buttons.detach().appendTo(text)
      })
    }
  }
});
