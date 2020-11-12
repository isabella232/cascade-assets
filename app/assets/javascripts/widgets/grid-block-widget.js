$(function () {
  debugging();
  gridBlockWidget();
});

function gridBlockWidget() {
  if ($(".grid-block-widget").length) {
    $(".grid-block-widget__text").each(function () {
      var textHeight = $(this).height();
      $(this).attr("data-height", textHeight);
      $(this).addClass("grid-block-widget__text--truncated");

      $(this)
        .parent(".grid-block-widget")
        .addClass("grid-block-widget--text-overflow");
      if ($(this).attr("data-height") >= 150) {
        $(this).parent().find(".grid-block-widget__reveal--more").show();
      }
    });
    clickHandlers();
  }
}

function clickHandlers() {
  $(".grid-block-widget__reveal--more").on("click keydown", function (e) {
    if (accessibleClick(event)) {
      parent = $(this).parent();
      $(parent)
        .find(".grid-block-widget__text")
        .removeClass("grid-block-widget__text--truncated")
        .addClass("grid-block-widget__text--revealed");
      $(this).hide();
      $(parent).find(".grid-block-widget__reveal--less").show();
      $(parent).find(".grid-block-widget__text").attr("aria-expanded", "true");
    }
  });
  $(".grid-block-widget__reveal--less").on("click keydown", function (e) {
    if (accessibleClick(event)) {
      parent = $(this).parent();
      $(parent)
        .find(".grid-block-widget__text")
        .addClass("grid-block-widget__text--truncated")
        .removeClass("grid-block-widget__text--revealed");
      $(this).hide();
      $(parent).find(".grid-block-widget__reveal--more").show();
      $(parent).find(".grid-block-widget__text").attr("aria-expanded", "false");
    }
  });
}
function debugging() {
  // !!! THIS IS FOR TESTING ONLY - DO NOT MERGE THIS INTO DEV/PROD !!!
  // function clearCache() {
  //   //get the mins of the current time
  //   var mins = new Date().getMinutes();
  //   if (mins == "00") {
  //     window.location.reload(true);
  //   }
  //   console.log("clearing cache in:  " + mins);
  // }

  // setInterval(clearCache, 1000);
  // if (!$("html").hasClass("cleared-cache")) {
  //   $("html").addClass("cleared-cache");
  //   window.location.reload(true);
  // }

  $("head").append('<meta http-equiv="expires" content="timestamp">');
  $("#theme").append(
    '<button id="clone" class="button button--red">Clone Grid Blocks</button><div id="grid-columns"><input type="range" id="columns" name="columns" min="2" max="6" value="3" step="1" /> <label id="grid-col-val" for="columns">columns</label></div>'
  );

  $(document).on("input change", "#columns", function () {
    var numberOfColumns = $(this).val();
    $("#grid-col-val").html(numberOfColumns + " Columns");

    var gridBlockWidgetColumns = $("#columns").html($(this).val());
    var bodyStyles = window.getComputedStyle(document.body);
    var fooBar = bodyStyles.getPropertyValue("--gridBlockWidgetColumns"); //get
    document.body.style.setProperty(
      "--gridBlockWidgetColumns",
      gridBlockWidgetColumns
    ); //set

    $(".grid-block-widget__container").each(function () {
      $(this).append(
        "<style>.grid-block-widget__container {grid-template-columns: repeat(--var(gridTemplateColumns), 1fr)}</style>"
      );
    });
  });

  $("#clone").click(function () {
    console.log("cloning");
    $(".grid-block-widget__container").each(function () {
      // 	var parent_id = $(this)
      var $col = $(this).find("> .grid-block-widget");
      for (var i = 0; i < 10; i++) {
        $col.clone().appendTo($(this));
      }
    });
    clickHandlers();
  });
}
