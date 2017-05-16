// Ugly way of using ipinfo API followed by geoip API when server side is not available **Requires Ajax**
$.get("http://ipinfo.io", function(response) {
    var yourip = response.ip;
    $.get("http://freegeoip.net/json/" + yourip, function(data, status){
            console.log(data.country_code);
        });
}, "jsonp");
