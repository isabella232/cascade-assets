$(function () {
  debugging();
  gridBlockWidget();

  setInterval(function () {
    // refreshCSS();
    refreshJS();
  }, 10000); // 10 seconds

  $("#clone").trigger("click");
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

    var buttonClickCounter = 0;

    $(".grid-block-widget__container").each(function () {
      // IDs are assigned via velocity format
      var currentWidgetContainer = $(this).attr("id");
      var loadMoreButtonButton = " + .grid-block-widget__button";
      var currentButton = "#" + currentWidgetContainer + loadMoreButtonButton;

      $(currentButton).on("click keydown", function (e) {
        if (accessibleClick(event)) {
          console.log("clicked");
          console.log("current widget container: #" + currentWidgetContainer);
          console.log("current widget button: " + currentButton);

          buttonClickCounter += 1;
          console.log("button click counter " + buttonClickCounter);

          var currentVisible = $("#" + currentWidgetContainer).find(
            ".grid-block-widget:visible"
          ).length;
          var currentHidden = $("#" + currentWidgetContainer).find(
            ".grid-block-widget:hidden"
          ).length;
          console.log("current hidden: " + currentHidden);

          if (buttonClickCounter == 1) {
            // $(this).parent().find(".grid-block-widget").nextAll().show();
            // $(this).parent().find(".grid-block-widget").slice(0, 6).show();
            console.log("parent: " + currentWidgetContainer);
            $("#" + currentWidgetContainer)
              .find(".grid-block-widget")
              .slice(0, 6)
              .show();

            $(currentButton).text("Show All");
          }
        }

        if (buttonClickCounter > 1) {
          //           $(currentButton).text('Show All');
          $(currentButton).fadeOut();
          $("#" + currentWidgetContainer)
            .find(".grid-block-widget")
            //             .slice(currentVisible, currentHidden)
            .show();
        }
      });
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

function paginate() {
  // $(".grid-block-widget__button").on("click keydown", function (e) {
  //   if (accessibleClick(event)) {
  //     console.log("clicked");
  //     // $(this).parent().find(".grid-block-widget").nextAll().show();
  //     // $(this).parent().find(".grid-block-widget").slice(0, 6).show();
  //     console.log(
  //       "parent: " +
  //         $(currentWidgetContainer).find(".grid-block-widget__container")
  //     );
  //   }
  // });
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
    '<div id="testing-tools"><a id="clone" class="button button--red">Clone Grid Blocks</a><div id="grid-columns"><input type="range" id="columns" name="columns" min="2" max="6" value="3" step="1" /><label id="grid-col-val" for="columns">3 columns</label></div><a id="content-editable" class="button button--red">Editable Text</a><a id="random-images" class="button button--red">Randomly Sized Images</a></div>'
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

    $("#grid-col-val").text().split(" ")[0];

    var gridBlockWidgetColumns = $("#grid-col-val").text().split(" ")[0];
    var bodyStyles = window.getComputedStyle(document.body);
    var fooBar = bodyStyles.getPropertyValue("--gridBlockWidgetColumns"); //get
    document.body.style.setProperty(
      "--gridBlockWidgetColumns",
      gridBlockWidgetColumns
    ); //set

    $(".grid-block-widget__container")
      .removeClass(
        "grid-block-widget__container--2-col grid-block-widget__container--3-col grid-block-widget__container--4-col grid-block-widget__container--5-col grid-block-widget__container--6-col"
      )
      .addClass(
        "grid-block-widget__container--" + gridBlockWidgetColumns + "-col"
      );
    $(".grid-block-widget__container").each(function () {
      $(this)
        .append
        // "<style>.grid-block-widget__container {grid-template-columns: repeat(var(--gridBlockWidgetColumns), 1fr)}</style>"
        ();
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
  $("#content-editable").click(function () {
    console.log("editable content");
    $(
      ".section-intro, .grid-block-widget__title,  .grid-block-widget__text, .grid-block-widget__button"
    ).attr("contentEditable", true);
    clickHandlers();
  });
  $("#random-images").click(function () {
    console.log("editable content");
    $(".grid-block-widget__container img").each(function () {
      var width = Math.floor(Math.random() * 200) + 200;
      var height = Math.floor(Math.random() * 600) + 300;
      $(this).attr(
        "src",
        " https://placedog.net/" + width + "/" + height + "?random"
      );
    });
    clickHandlers();
  });
}

refreshCSS = () => {
  console.log("hot swapping CSS");
  let links = document.getElementsByTagName("link");
  for (let i = 0; i < links.length; i++) {
    if (links[i].getAttribute("rel") == "stylesheet") {
      let href = links[i].getAttribute("href").split("?")[0];

      let newHref = href + "?version=" + new Date().getMilliseconds();

      links[i].setAttribute("href", newHref);
    }
  }
};

refreshJS = () => {
  console.log("hot swapping JS");
  var scripts = document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++) {
    var href = scripts[i].src.split("?")[0];
    var source = href + "?version=" + new Date().getMilliseconds();
    scripts[i].setAttribute("src", source);
  }
};
