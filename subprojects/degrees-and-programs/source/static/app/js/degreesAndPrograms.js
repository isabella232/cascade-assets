/*global window:false */
/*global $:false */
/*jslint plusplus: true */

var chapman = chapman || {};

(function ($, Modernizr, window, document) {

  'use strict';

  chapman.degreesAndPrograms = {

    init: function () {

      $('.degrees-and-programs').addClass('ready');

      this.bindUIEvents();


    },

    bindUIEvents: function () {

      $('.results-views li').on('click', function () {
        chapman.degreesAndPrograms.switchResultsView($(this));
      });

      $('.dap-results').on('click', '.active-content-toggle', function (event) {
        event.preventDefault();
        $(this).closest('.result').toggleClass('active');
      });

      $('#js-dap-undergraduate-interests .show-more a').on('click', function () {
        $('#js-dap-undergraduate-interests-list').addClass('show-all');
      });

    },

    switchResultsView: function (el) {
      var viewButton = el,
        newView = viewButton.data('view'),
        results = viewButton.closest('.dap-results');

      if (!(viewButton.hasClass('active'))) {

        viewButton.closest('.results-views').find('li').removeClass('active');
        viewButton.addClass('active');

        if (newView === 'grid-view') {
          results.removeClass('list-view').addClass('grid-view');
        } else if (newView === 'list-view') {
          results.removeClass('grid-view').addClass('list-view');
        }

      }

    }

  };

})(window.jQuery, window.Modernizr, window, window.document);

$(function () {

  'use strict';

  chapman.degreesAndPrograms.init();


});

$(window).load(function () {
  setWavyBgHeight();
});

function setWavyBgHeight() {
  $('form').each(function () {
    var contentHeight = $(this).outerHeight()
    var wavyBGHeight = $(this).closest('.wavy-bg').height()
    //     var wavyBGHeight = window.getComputedStyle(wavyBG, ':before').height; // Returns (string) "70px"

    $(this).find('.wavy-bg').height(contentHeight)

  })
}