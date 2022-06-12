exports.handler = function(event, context, callback) {
    var utm_source = "";
    var utm_medium = "";
    var utm_content = "";
    var utm_term = "";
    var utm_campaign = "";
    var gclid = "";
    var fbclid = "";
    let call = event.activity;
    var visitor_ip = "";
    if (call.visitor_ip){
      visitor_ip = call.visitor_ip;
    }
    
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name.toLowerCase() + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(call.location.toLowerCase());
        if (results === null) return "";
        else return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    if (getParameterByName("utm_source")) {
        utm_source = getParameterByName("utm_source");
    }
    if (getParameterByName("utm_medium")) {
        utm_medium = getParameterByName("utm_medium");
    }
    if (getParameterByName("utm_content")) {
        utm_content = getParameterByName("utm_content");
    }
    if (getParameterByName("utm_term")) {
        utm_term = getParameterByName("utm_term");
    }
    if (getParameterByName("utm_campaign")) {
        utm_campaign = getParameterByName("utm_campaign");
    }
    if (getParameterByName("gclid")) {
        gclid = getParameterByName("gclid");
    }
    if (getParameterByName("fbclid")) {
        fbclid = getParameterByName("fbclid");
    }
    
    context.ctm.update({
        custom_fields: {
            utm_source,
            utm_medium,
            utm_content,
            utm_term,
            utm_campaign,
            gclid,
            fbclid,
            visitor_ip
        }
    }).then(function() {
        console.log("success");
        context.done();
    }).catch(function() {
        console.error("error");
    });
};
