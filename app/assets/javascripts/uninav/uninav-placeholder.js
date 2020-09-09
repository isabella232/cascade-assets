$(function () {
    $("#uninav-static-close").click(function () {
        $('.uninav-static-placeholder__notice').fadeOut(1200);
        $('.uninav__logo, .uninav__global-nav, .uninav__utility-nav--wrapper, .uninav__cta').css('filter', 'blur(0)');
    });
});