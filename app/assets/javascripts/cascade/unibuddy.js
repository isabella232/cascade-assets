$(function () {
    if ($('#unibuddy-popcard-iframe').length) {
        document.addEventListener("DOMContentLoaded", function () {
            const unibuddy = document.getElementById("unibuddy-popcard-iframe");
            const uninav = document.getElementById("uninav");
            uninav.after(unibuddy);
        });
    }
});
