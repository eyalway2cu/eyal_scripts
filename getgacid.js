// function for pulling cookie by name
function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1'); };
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}
//save cookid into variable
var cidDirty = getCookie("_ga");
//clean cid value for usage in analytics
var cid = cidDirty.slice(6);
