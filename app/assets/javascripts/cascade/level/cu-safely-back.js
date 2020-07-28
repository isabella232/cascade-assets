$(function () {
  if ($(".one-column-template .text-with-cta-widget--default").length) {
    $('.one-column-template .text-with-cta-widget--default').each(function () {
      var buttons = $(this).find('.text-with-cta__buttons')
      var title = $(this).find('.text-with-cta__title')
      buttons.detach().appendTo(title)
    })
  }
});
