$(document).ready(function () {
    $.each($('.photo-callout-widget__container'), function (ind) {
        $(this).attr('id', 'photo-callout-widget__container__' + parseInt(ind + 1));
        var currentWidgetContainer = $(this).closest('.photo-callout-widget__container').attr('id');

        console.log(currentWidgetContainer)
        var currentTotalNumberOfPhotos = $('#' + currentWidgetContainer + " img").size()
        console.log(currentWidgetContainer + currentTotalNumberOfPhotos);
        var loadMoreButtonButton = ' + .photo-callout-widget__button';
        var currentButton = '#' + currentWidgetContainer + loadMoreButtonButton;
        console.log("'" + currentButton + "'");
        var numberOfPhotoDivsToReveal = 3;


        if ($('#' + currentWidgetContainer).hasClass('photo-callout-widget__container--2-col')) {
            var photoIncrement = 2;
            var numberOfPhotoLinksToReveal = 4;
        }
        else if ($('#' + currentWidgetContainer).hasClass('photo-callout-widget__container--3-col')) {
            var photoIncrement = 3;
            var numberOfPhotoLinksToReveal = 5;
        }
        else if ($('#' + currentWidgetContainer).hasClass('photo-callout-widget__container--4-col')) {
            var photoIncrement = 8;
            var numberOfPhotoLinksToReveal = 8;
        }
        else if ($('#' + currentWidgetContainer).hasClass('photo-callout-widget__container--5-col')) {
            var photoIncrement = 5;
            var numberOfPhotoLinksToReveal = 10;
        }
        else if ($('#' + currentWidgetContainer).hasClass('photo-callout-widget__container--6-col')) {
            var photoIncrement = 6;
            var numberOfPhotoLinksToReveal = 12;
        }


        // $('#' + currentWidgetContainer + ' > a:lt(' + photoIncrement + ')').show();
        // $('#' + currentWidgetContainer + ' > div:lt(' + photoIncrement + ')').show();

        var buttonClickCounter = 0;
        console.log('number photos: ' + currentTotalNumberOfPhotos)
        if (currentTotalNumberOfPhotos > photoIncrement) {
            $(currentButton).show();
        }
        $('button.photo-callout-widget__button--no-paginate').hide();

        $(currentButton).click(function () {
            buttonClickCounter += 1;

            // $("img.photo-callout-widget__img:visible").css("border", "5px solid yellow");
            // $("img.photo-callout-widget__img:visible").addClass("fade-in");

            // $('#' + currentWidgetContainer + ' img:visible').addClass('fade-in');


            numberOfPhotoLinksToReveal = (numberOfPhotoLinksToReveal + photoIncrement);
            console.log('numberOfPhotoLinksToReveal ' + numberOfPhotoLinksToReveal);
            console.log('photoIncrement ' + photoIncrement);

            $('#' + currentWidgetContainer + ' > a:lt(' + numberOfPhotoLinksToReveal + ')').show();

            if (buttonClickCounter < 2) {
                $('#' + currentWidgetContainer + ' > a:lt(' + numberOfPhotoLinksToReveal + ')').show();
                $('#' + currentWidgetContainer + ' > div:lt(' + numberOfPhotoLinksToReveal + ')').show();
            } else if (buttonClickCounter == 2 && currentTotalNumberOfPhotos > photoIncrement) {
                console.log('currentTotalNumberOfPhotos ' + currentTotalNumberOfPhotos)
                $(currentButton).text('Load All')
                $('#' + currentWidgetContainer + ' > a:lt(' + numberOfPhotoLinksToReveal + ')').show();
                $('#' + currentWidgetContainer + ' > div:lt(' + numberOfPhotoLinksToReveal + ')').show();


            } else if (buttonClickCounter > 2) {
                $('#' + currentWidgetContainer + ' > a').show(0);
                $('#' + currentWidgetContainer + ' > div').show(0);
                $(currentButton).text('All Photos Loaded')
                $(currentButton).fadeOut(0);
                buttonClickCounter = 0;
            }

            var currentVisible = $('#' + currentWidgetContainer + ' .photo-callout-widget:visible').size()

            console.log('currentVisible: ' + currentWidgetContainer + ' ' + currentVisible + 'number of photos: ' + currentTotalNumberOfPhotos)


            if (currentVisible == currentTotalNumberOfPhotos) {
                console.log('currentVisible: ' + currentWidgetContainer + ' ' + currentVisible)
                console.log('number of photo links to reveal: ' + currentWidgetContainer + ' ' + numberOfPhotoLinksToReveal)
                $(currentButton).text('All Photos Loaded')
                $(currentButton).fadeOut(0);
            }
            console.log('number of photos: ' + currentWidgetContainer + ' ' + currentTotalNumberOfPhotos)



        });
    });
    objectFitFallBackForIe();
});
function resetbuttonClickCounterer() {
    var buttonClickCounter = 0;
    console.log('buttonClickCounter ' + buttonClickCounter);
}


// set smallest image height to largest image in collection
function normalizeImageHeights() {
    $('#' + currentWidgetContainer).each(function () {
        console.log(currentWidgetContainer)
        var highestBox = 0;

        $(this).find('.photo-callout-widget__img').each(function () {
            if ($(this).height() > highestBox) {
                highestBox = $(this).height();
                console.log(highestBox)
            }
        })

        $(this).find('img').height(highestBox);
    });
}

// object-fit fallback for ie internet explorer
function objectFitFallBackForIe() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (
        msie > 0 ||
        (!!navigator.userAgent.match(/Trident.*rv\:11\./) &&
            $(".photo-callout-widget__img").length)
    ) {
        $("img.photo-callout-widget__img").each(function () {
            var t = $(this),
                s = "url(" + t.attr("src") + ")",
                p = t.parent(),
                d = $("<div class='ie__fallback--object-fit'></div>");
            t.hide();
            p.append(d);
            d.css({
                height: 150,
                "background-size": "cover",
                "background-repeat": "no-repeat",
                "background-position": "center",
                "background-image": s
            });
        });
    }
}
