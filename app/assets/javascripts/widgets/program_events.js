$(document).ready(function() {
  var $programEvents = $('[data-chapman-program-events]');
  
  if (!$programEvents.length) return;
  $programEvents.chapmanEventsFeed({ 
    feed_path: $programEvents.data().chapmanProgramEvents,
    program_events: true,
    per: 6
  });
});