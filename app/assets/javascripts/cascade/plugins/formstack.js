$(function() {
   if (!($('.formstack').length)) {
    $('body').append('<div data-detective="WCAG override via app/assets/javascripts/cascade/plugins/formstack.js" id="formstack-overrides"><style>.fsValidationError{background-color:red;-moz-box-shadow:0 0 0 calc(5px - 1px) red, 0 0 0 5px red;-webkit-box-shadow:0 0 0 calc(5px - 1px) red, 0 0 0 5px red;box-shadow:0 0 0 calc(5px - 1px) red, 0 0 0 5px red}.fsValidationError .fsLabel,.fsValidationError .fsRequiredLabel,.fsValidationError .fsRequiredMarker{color:black !important}</style></div>');
  }
});
