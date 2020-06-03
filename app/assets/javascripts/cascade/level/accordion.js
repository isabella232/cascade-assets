$(function () {
  $(".accordion .content").not(".accordion.active .content").css("display", "none");
  $(".accordion.active .content").css("display", "block");
  // ADD UNIQUE ID TO EACH ACCORDION ON PAGE
  $.each($('.collapsibles-widget'), function (ind) {
    var currentCollapsibleWidget = $(this).closest('.collapsibles-widget').attr('id'),
      accordionClass = ' .accordion',
      accordionChildren = ' > .accordion',
      currentAccordion = currentCollapsibleWidget + accordionClass,
      currentAccordionChildren = currentCollapsibleWidget + currentAccordionChildren,
      toggleAttr = ' [data-toggle="collapsibles-widget__toggle"]',
      currentToggle = currentCollapsibleWidget + toggleAttr

    $(this).attr('id', 'accordion-' + parseInt(ind + 1));
    // IF MULTIPLE ACCORDIONS, CHANGE TEXT
    if ($(this).find('.accordion').length == 1) {
      $(this).find(toggleAttr).hide();
    } else if ($(this).find('.accordion').length > 1) {
      $(this).find(toggleAttr).text('Expand');
    }
  });
  // HANDLE CLICKS ON HEADERS
  $(".accordion .header").click(function () {
    $(this).parent(".accordion").toggleClass("active").children(".content").slideToggle('fast');
    $(".accordion.active .content").css("display", "block");
  });
  $(".accordion").children(".header").keydown(function (e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      $(this).parent(".accordion").toggleClass("active").children(".content").slideToggle('fast');
      return false
    }
  })
  // HANDLE EXPAND TOGGLES
  $(".collapsibles-widget .toggle-expand-collapse").on('click keypress', function (event) {
    var currentCollapsibleWidget = $(this).closest('.collapsibles-widget').attr('id'),
      currentCollapsibleWidget = '#' + currentCollapsibleWidget,
      contentClass = ' .content',
      content = currentCollapsibleWidget + contentClass,
      accordionClass = ' .accordion',
      currentAccordion = currentCollapsibleWidget + accordionClass,
      toggleClass = ' .toggle-expand-collapse',
      currentToggle = currentCollapsibleWidget + toggleClass,
      expandClass = ' .toggle-expand-collapse.expand',
      toggleAttr = ' [data-toggle="collapsibles-widget__toggle"]',
      currentToggle = currentCollapsibleWidget + toggleAttr,
      expandId = ' #collapsibles-widget__expand',
      currentExpand = currentCollapsibleWidget + expandId,
      collapseId = ' #collapsibles-widget__collapse',
      currentCollapse = currentCollapsibleWidget + collapseId,
      collapseClass = ' .toggle-expand-collapse.collapse',
      introText = ' .editableContent.summaryText',
      currentIntroText = currentCollapsibleWidget + introText,
      currentIntroTextHeight = $(currentIntroText).height(),
      omniHeight = $('#uninav').height();
    // EXPAND
    if ($(currentToggle).hasClass('expand')) {
      $(content).fadeIn('fast');
      $(currentAccordion).addClass('active');
      $(currentToggle).removeClass('expand');
      $(currentToggle).addClass('collapse');
      $(currentCollapse).fadeIn('fast');
      // FOCUS ON COLLAPSE TOGGLE
      $(currentCollapse).focus();
      // SCROLL TO TOP OF ID
      if ((currentAccordion).length > 1) {
        $(currentToggle).text('Collapse');
      }
    }
    // HANDLE COLLAPSE TOGGLES
    else if ($(currentToggle).hasClass('collapse')) {
      $(currentAccordion).removeClass('active');
      $(content).css('display', 'none');
      $(currentExpand).fadeIn('fast');
      $(currentCollapse).fadeOut('fast');
      $(currentToggle).removeClass('collapse');
      $(currentToggle).addClass('expand');
      $(currentExpand).focus();
      if ((currentAccordion).length > 1) {
        $(currentToggle).text('Expand');
      }
    }
  });
});
// KEYS 🎹
function a11yClick(event) {
  if (event.type === 'click') {
    return true;
  } else if (event.type === 'keypress') {
    var code = event.charCode || event.keyCode;
    if ((code === 32) || (code === 13)) {
      return true;
    }
  } else {
    return false;
  }
}