$(function () {
    if ($('#covid19-callout-box').length > 0) {
        $('#covid19-callout-box').on("keypress", function (e) {
            if (a11yClick(event) === true) {
                _toggleContactEl();
            }
        });

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
        $("#covid19-callout-box").detach().prependTo('#main');
    }
});
