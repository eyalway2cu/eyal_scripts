exports.handler = function(event, context, callback) {
    let call = event.activity;

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name.toLowerCase() + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(call.location.toLowerCase());
        if (results === null) return "";
        else return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    //console.log(getParameterByName("fbclid"));
    if (getParameterByName("fbclid")) {
        var fcb = "fb.1." + Date.now() + "." + getParameterByName("fbclid");
        context.ctm.update({
            custom_fields: {
                fcb: fcb
            }
        }).then(function() {
            console.log("fcb injected");
            context.done();
        }).catch(function() {
            console.error("something went wrong");
        });
    }
};
