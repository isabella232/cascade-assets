$(window).on("load resize", function (e) {
  if ($(".one-column-template .text-with-cta-widget--default").length) {
    if ($(window).width() > 768) {
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
