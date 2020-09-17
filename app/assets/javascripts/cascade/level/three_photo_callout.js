$(document).ready(function () {
    $.each($('.photo-callout-widget__container'), function (ind) {

        if ($(this).find(' .photo-callout-widget:hidden').size() <= 0) {
            $(this).find('.photo-callout-widget__button').fadeOut()
        }

        // if ($(this).find("photo-callout-widget:hidden").size() <= 0) {
        //     $(this).find('.photo-callout-widget__button').hide();
        // }

        $(this).attr('id', 'photo-callout-widget__container__' + parseInt(ind + 1));
        var currentWidgetContainer = $(this).closest('.photo-callout-widget__container').attr('id');
        console.log(currentWidgetContainer)
        var currentTotalNumberOfPhotos = $('#' + currentWidgetContainer + " .photo-callout-widget").size()
        var currentHidden = $('#' + currentWidgetContainer + ' .photo-callout-widget:hidden').size();


        // debugger;
        console.log(currentWidgetContainer + currentTotalNumberOfPhotos);
        var loadMoreButtonButton = ' + .photo-callout-widget__button';
        var currentButton = '#' + currentWidgetContainer + loadMoreButtonButton;
        console.log("'" + currentButton + "'");
        var numberOfPhotoDivsToReveal = 3;
        var photoIncrement = 2;
        var numDivsToShow = 2;
        if ($('#' + currentWidgetContainer).hasClass('photo-callout-widget__container--2-col')) {
            var photoIncrement = 2;
            var numDivsToShow = 4;
        } else if ($('#' + currentWidgetContainer).hasClass('photo-callout-widget__container--3-col')) {
            var photoIncrement = 3;
            var numDivsToShow = 6;
        } else if ($('#' + currentWidgetContainer).hasClass('photo-callout-widget__container--4-col')) {
            var photoIncrement = 8;
            var numDivsToShow = 8;
        } else if ($('#' + currentWidgetContainer).hasClass('photo-callout-widget__container--5-col')) {
            var photoIncrement = 5;
            var numDivsToShow = 10;
        } else if ($('#' + currentWidgetContainer).hasClass('photo-callout-widget__container--6-col')) {
            var photoIncrement = 6;
            var numDivsToShow = 12;
        }

        var currentVisible = $('#' + currentWidgetContainer + ' img:visible').length;
        console.log(currentWidgetContainer + ' current visible ' + currentVisible)

        // var currentVisible = $('#' + currentWidgetContainer + ' .photo-callout-widget:visible').size()


        // Hide image wrapper divs to start
        $('#' + currentWidgetContainer + ' > .photo-callout-widget').hide();

        // Show the starting number specified above
        $('#' + currentWidgetContainer + ' > .photo-callout-widget:lt(' + numDivsToShow + ')').show();

        var buttonClickCounter = 0;



        var hiddenItems = $(this).find('.photo-callout-widget:hidden');
        var button = $(this).next('.photo-callout-widget__button')
        if (hiddenItems.length <= 0) {
            $(button).fadeOut()
        }



        // $('button.photo-callout-widget__button--no-paginate').hide();
        // $('button.photo-callout-widget__button--paginate').show();

        // console.log(currentWidgetContainer + ' currentHidden ' + currentHidden)
        // if ($(currentHidden <= 0)) {
        //     $('#' + currentWidgetContainer + ' button.photo-callout-widget__button--paginate').fadeOut();
        // }
        // else if ($(currentHidden >= 0)) {
        //     $('#' + currentWidgetContainer + ' button.photo-callout-widget__button--paginate').fadeIn();
        // }




        $(currentButton).click(function () {
            var currentVisible = $('#' + currentWidgetContainer + ' img:visible').length;
            console.log(currentWidgetContainer + ' current visible ' + currentVisible)

            // var currentVisible = $('#' + currentWidgetContainer + ' .photo-callout-widget:visible').size()
            // console.log(currentWidgetContainer + ' current hidden ' + currentHidden)
            buttonClickCounter += 1;
            numDivsToShow = (numDivsToShow + 6);
            $('#' + currentWidgetContainer + ' > a:lt(' + numDivsToShow + ')').show();
            if (buttonClickCounter < 2) {
                $('#' + currentWidgetContainer + ' > a:lt(' + numDivsToShow + ')').show();
                $('#' + currentWidgetContainer + ' > div:lt(' + numDivsToShow + ')').show();
            } else if (buttonClickCounter == 2 && currentTotalNumberOfPhotos > 6) {
                $(currentButton).text('Load All')
                $('#' + currentWidgetContainer + ' > a:lt(' + numDivsToShow + ')').show();
                $('#' + currentWidgetContainer + ' > div:lt(' + numDivsToShow + ')').show();
            } else if (buttonClickCounter > 2) {
                $('#' + currentWidgetContainer + ' > a').show(0);
                $('#' + currentWidgetContainer + ' > div').show(0);
                $(currentButton).text('All Photos Loaded')
                $(currentButton).fadeOut(0);
            }
            var currentVisible = $('#' + currentWidgetContainer + ' .photo-callout-widget:visible').size()
            console.log('currentVisible: ' + currentWidgetContainer + ' ' + currentVisible + 'number of photos: ' + currentTotalNumberOfPhotos)
            if (currentVisible == currentTotalNumberOfPhotos) {
                console.log('currentVisible: ' + currentWidgetContainer + ' ' + currentVisible)
                console.log('number of photo links to reveal: ' + currentWidgetContainer + ' ' + numDivsToShow)
                $(currentButton).text('All Photos Loaded')
                $(currentButton).fadeOut(0);
            }
            console.log('number of photos: ' + currentWidgetContainer + ' ' + currentTotalNumberOfPhotos)
            // end click function
        });

        var currentHidden = $('#' + currentWidgetContainer + ' .photo-callout-widget:hidden').length;
        console.log(currentWidgetContainer + ' current hidden ' + currentHidden)



        // end each widget function
    });
    objectFitFallBackForIe();
});


function resetbuttonClickCounterer() {
    var buttonClickCounter = 0;
    console.log('buttonClickCounter ' + buttonClickCounter);
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