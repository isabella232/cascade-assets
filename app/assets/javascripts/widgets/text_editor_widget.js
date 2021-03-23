$(function () {
  if ($(".text-editor-widget").length) {
    $(".text-editor-widget[text-align='right']").each(function () {
      var buttons = $(this).find(".button-container");
      var links = $(this).find(".link-container");
      var text = $(this).find("span");

      links.detach().appendTo(text);
      links.attr("data-js", "moved element via text_editor_widget.js");

      buttons.detach().appendTo(text);
      buttons.attr("data-js", "moved element via text_editor_widget.js");
    });
  }
});
