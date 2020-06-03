$(document).ready(function() {
  var $rssFeedContainer = document.querySelector('.rss-feed-display-widget')

  // NO RSS FEED WIDGET ON PAGE
  if (!$rssFeedContainer) return;

  var rssFeedItemColor = $rssFeedContainer.getAttribute('data-bg-color'),
  rssFeedUrl           = $rssFeedContainer.getAttribute('data-rss-feed');

  if (!rssFeedUrl.length) return;

  // SHOULD BUILD OUT FOR MORE ROBUST DATES CURRENTLY ONLY ACCEPTS WORDPRESS STYLE RSS FEED DATE FORMAT NOT SURE WHAT RSS FEED STANDARD IS FOR pubDate
  function createFeedItemDateTime(rssFeedItemDate, type) {
    switch(type) {
      case 'wordpress':
        var months  = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
        date        = Date.parse(rssFeedItemDate),
        month       = months[new Date(date).getMonth()],
        dayOfMonth  = new Date(date).getDate(),
        year        = new Date(date).getFullYear(),
        hour        = new Date(date).getHours() > 12 ? new Date(date).getHours() - 12 : new Date(date).getHours(),
        minute      = new Date(date).getMinutes() < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes(),
        ampm        = new Date(date).getHours() > 12 ? 'p.m.' : 'a.m.';

        if (hour == 0 || hour == 00)
          hour = 12
    
        return {date: month + ' ' + dayOfMonth + ', ' + year, time: hour + ':' + minute + " " + ampm};
      default:
        return rssFeedItemDate;
    }
  }

  function displayMoreRssItems() {
    var hiddenRssItems = $rssFeedContainer.querySelectorAll('.hidden-rss-item'),
    i = 0;

    while(i < 4) {
      hiddenRssItems[i].classList.remove('hidden-rss-item');
      hiddenRssItems[i].classList.add('rss-feed-item__container');
      hiddenRssItems[i].classList.add('bg-color--' + rssFeedItemColor);
      i++;
    }
  }

  function cleanTrimText(text, maxLength) {
    var cleanText = text.trim().replace(/(<([^>]+)>)/ig, ''),
    textArea      = document.createElement('textarea');

    if (cleanText.length > maxLength) {
      // IF THERE IS NO SPACE AFTER THE LAST CHARACTER OF MAX LENGTH MAX LENGTH IS SECOND TO LAST WORD
      cleanText = cleanText.substring(0, cleanText.indexOf(" ", maxLength) < 0 ? maxLength + 1 : cleanText.indexOf(" ", maxLength));
      cleanText = cleanText + '...'
    }

    // DECODE UNICODE CHARACTERS SEE SO 
    // https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it/7394787
    textArea.innerHTML = cleanText;

    return textArea.value;
  }

  // GET RSS FEED DATA FROM NODE PARSER APPLICATION
  $.getJSON("https://social04.chapman.edu:4040/data?url=" + rssFeedUrl, function (data) {
    var feedItems      = data[0].item;
    $rssFeedItemButton = document.createElement('button');
    $rssFeedItemButton.className = 'rss-feed-display-widget__button button--' + rssFeedItemColor;
    $rssFeedItemButton.innerHTML = 'View More';

    $rssFeedItemButton.addEventListener('click', displayMoreRssItems)

    if (!feedItems.length) {
      var $emptyFeed = document.createElement('p');
      $emptyFeed.innerHTML = 'There are no items to display in the feed.'
      $rssFeedContainer.appendChild($emptyFeed);
      return;
    }

    feedItems.forEach(function(feedItem, idx) {
      var feedItemDate        = createFeedItemDateTime(feedItem.pubDate[0], 'wordpress'),
      feedItemDescription     = cleanTrimText(feedItem.description[0], 100);

      // CREATE RSS FEED HTML ELEMENTS
      var $feedItemContainer        = document.createElement('div'),
      $feedItemDescriptionContainer = document.createElement('div'),
      $feedItemDescription          = document.createElement('p'),
      $feedItemLink                 = document.createElement('a'),
      $feedItemDateContainer        = document.createElement('div'),
      $feedItemDate                 = document.createElement('p'),
      $feedItemTime                 = document.createElement('p');

      // ADDED CSS CLASS TO FIRST FOUR RSS DIPSLAY ELEMENTS IN FEED 
      // HIDE THE REST ADD APPROPRIATE CLASSES TO EACH ELEMENT
      $feedItemContainer.className            = idx < 4 ? 'rss-feed-item__container bg-color--' + rssFeedItemColor :'hidden-rss-item';
      $feedItemDescriptionContainer.className = 'rss-feed-item__description-container';
      $feedItemDescription.className          = 'rss-feed-item__description-text';
      $feedItemLink.className                 = 'rss-feed-item__link text--link';
      $feedItemDateContainer.className        = 'rss-feed-item__date-container';
      $feedItemDate.className                 = 'rss-feed-item__date text__bold';
      $feedItemTime.className                 = 'rss-feed-item__time';

      // ADDED INNER TEXT, DATE, AND TIME TO APPOPRIATE RSS DISPLAY ELEMENTS
      $feedItemDescription.innerHTML  = feedItemDescription;
      $feedItemLink.innerHTML         = feedItem.title[0];
      $feedItemDate.innerHTML         = feedItemDate.date;
      $feedItemTime.innerHTML         = feedItemDate.time;

      $feedItemLink.setAttribute('href', feedItem.link[0]);

      // APPENDING APPROPRIATE RSS ITEMS TO ELEMENTS AND THEN CONTAINER
      $feedItemDateContainer.appendChild($feedItemDate)
      $feedItemDateContainer.appendChild($feedItemTime)
      $feedItemDescriptionContainer.appendChild($feedItemLink)
      $feedItemDescriptionContainer.appendChild($feedItemDescription)
      $feedItemContainer.appendChild($feedItemDateContainer)
      $feedItemContainer.appendChild($feedItemDescriptionContainer)
      $rssFeedContainer.appendChild($feedItemContainer);

    });

    $rssFeedContainer.append($rssFeedItemButton);
    return;

  }).done(function (data) {

  }).fail(function (data) {
    var $emptyFeed = document.createElement('p');
    $emptyFeed.innerHTML = 'There are no items to display in the feed.'
    $rssFeedContainer.appendChild($emptyFeed);
    return;
  });
});
