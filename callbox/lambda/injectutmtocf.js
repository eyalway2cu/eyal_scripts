exports.handler = function(event, context, callback) {
    var utm_source = "";
    var utm_medium = "";
    var utm_content = "";
    var utm_term = "";
    var utm_campaign = "";
    let call = event.activity;

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
    if (getParameterByName("utm_campaign")) {
        utm_campaign = getParameterByName("utm_campaign");
    }
    if (getParameterByName("utm_term")) {
        utm_term = getParameterByName("utm_term");
    }
    if (getParameterByName("utm_content")) {
        utm_content = getParameterByName("utm_content");
    }
    
    context.ctm.update({
        custom_fields: {
            utm_source: utm_source,
            utm_medium: utm_medium,
            utm_content: utm_content,
            utm_term: utm_term,
            utm_campaign: utm_campaign
        }
    }).then(function() {
        console.log("success");
        context.done();
    }).catch(function() {
        console.error("error");
    });
};
