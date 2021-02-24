var EmergencyAlert = (function() {
  // Module Vars
  var emergencyAlertDiv,
      alertMessage,
      raveFeed,
      noEmergencyMessage,
      isEmergency = false;

  // Module Functions
  var initialize = function() {
    emergencyAlertDiv = $('div.emergency-alert');
    alertMessage = $('div.alert-message').text();
    // Imposter test & Local Test urls
    // raveFeed = 'https://imposter.chapman.edu/rave.rss';
    // raveFeed = 'http://localhost:3000/rave.rss';
    // raveNotificationFeed = 'http://localhost:3000/rave_notification.rss';
    
    raveFeed = 'https://content.getrave.com/rss/chapman/channel2';
    raveNotificationFeed = 'https://content.getrave.com/rss/chapman/channel3';
    
    noNotificationMessage = 'There is currently no notification';
    noEmergencyMessage = "There is currently no emergency"; // current Rave message for no emergency

    // If there is already a message (comes from data def in Cascade),
    // don't override the HTML with Rave feed
    if (alertMessage.trim() != '') {
      displayEmergencyAlert();
    }
    else {
      $.ajax({
        url: raveFeed,
        type: 'GET',
        success: function(data) {
          $(data).find("item").each(function () {
            var title = $(this).find("title").text();
            // Looks for absence of the "no emergency" message
            isEmergency = title.indexOf(noEmergencyMessage) < 0;
          });
          
          if(isEmergency) {
            displayEmergencyAlert();
            fillRaveFeedData(data);
            return;
          }

          $.ajax({
            url: raveNotificationFeed,
            type: 'GET',
            success: function(data) {
              $(data).find("item").each(function () {
                var title = $(this).find("title").text();
                // Looks for absence of the "no notification" message
                isNotification = title.indexOf(noNotificationMessage) < 0;
              });
              
              if(isNotification) {
                displayNotification();
                fillRaveFeedData(data);
                return
              }
            }
          })
        }
      });
    }
  };

  var displayEmergencyAlert = function() {
    emergencyAlertDiv.show();
    var trigger = $('.close-alert-trigger');
    addCloseTrigger(trigger);
  };

  var displayNotification = function() {
    var $notificationLink = $("<a>", {
      href: "https://cusafelyback.chapman.edu",
      text: 'cusafelyback.chapman.edu'
    });
    $('.emergency-alert').addClass('notification');
    $('.alert-heading').text('Chapman Notice');
    $('.alert-link').text('For more information and frequent updates, visit: ');
    $('.alert-link').append($notificationLink);
    $('#icon-warning').remove();
    $('.alert-text').prepend(
      "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='icon-warning' x='0px' y='0px' viewBox='0 0 246.027 246.027' style='enable-background:new 0 0 32 32;' xml:space='preserve' width='32px' height='32px'><path d='M242.751,196.508L143.937,25.358c-4.367-7.564-12.189-12.081-20.924-12.081c-8.735,0-16.557,4.516-20.924,12.081  L3.276,196.508c-4.368,7.564-4.368,16.596,0,24.161s12.189,12.081,20.924,12.081h197.629c8.734,0,16.556-4.516,20.923-12.08  C247.119,213.105,247.118,204.073,242.751,196.508z M123.014,204.906c-8.672,0-15.727-7.055-15.727-15.727  c0-8.671,7.055-15.726,15.727-15.726s15.727,7.055,15.727,15.726C138.74,197.852,131.685,204.906,123.014,204.906z M138.847,137.68  c0,8.73-7.103,15.833-15.833,15.833s-15.833-7.103-15.833-15.833V65.013c0-4.142,3.358-7.5,7.5-7.5h16.667  c4.143,0,7.5,3.358,7.5,7.5V137.68z' fill='#FFFFFF'/></svg>"
    );

    emergencyAlertDiv.show();
    var trigger = $('.close-alert-trigger');
    addCloseTrigger(trigger);
  }

  var addCloseTrigger = function(trigger) {
    trigger.on('click', function() {
      emergencyAlertDiv.slideUp("slow");
    });
  };

  var fillRaveFeedData = function(data) {
    // There should really only be 1 item in the feed at any given time
    // See imposter.chapman.edu for sample feeds
    $(data).find("item").each(function () {
      var item = $(this);
      var raveFeedDescription = item.find("description").text();
      emergencyAlertDiv.find('div.alert-message').html(raveFeedDescription);
      var raveFeedTitle = item.find("title").text();
      emergencyAlertDiv.find('div.alert-title').html(raveFeedTitle);
    });
  };

  return {
    init: initialize
  };
})();

$(document).ready(function() {
  // Only load on homepage
  if($('.homepage').length) {
    EmergencyAlert.init();
  }
});
