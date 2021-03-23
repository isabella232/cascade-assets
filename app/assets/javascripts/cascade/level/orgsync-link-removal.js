$(function () {
  $('a[href*="orgsync"]').each(function () {
    var originalSource = $(this).attr("href");
    $(this).attr("data-original-source", originalSource);
    $(this).attr(
      "data-source",
      'This href source originally contained "orgsync.com" - changed via JavaScript in Cascade Assets'
    );
    $(this).attr("href", "https://chapman.campuslabs.com/engage");
  });
});
