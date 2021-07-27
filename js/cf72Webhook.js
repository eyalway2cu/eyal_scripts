function objectToQueryString(obj){
    var str = [];
    for(var p in obj)
        if (obj.hasOwnProperty(p)){
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
var pixel = document.createElement("img");
document.addEventListener('wpcf7submit', function(event){
    var qs = objectToQueryString(event.detail.formattedData);
    pixel.src = "https://{{webhookurl}}?" + qs;
}, false);
