exports.handler = function(event, context, callback) {
    let utm_source = "";
    let utm_medium = "";
    let utm_content = "";
    let utm_term = "";
    let utm_campaign = "";
    let gclid = "";
    let fbclid = "";
    let call = event.activity;
    let visitor_ip = "";
    if (call.visitor_ip){
      visitor_ip = call.visitor_ip;
    }
    
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        let regexS = "[\\?&]" + name + "=([^&#]*)";
        let regex = new RegExp(regexS);
        let results = regex.exec(call.location);
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
    if (getParameterByName("wbraid")) {
        wbraid = getParameterByName("wbraid");
    }
    if (getParameterByName("gbraid")) {
        gbraid = getParameterByName("gbraid");
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
            wbraid,
            gbraid,
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
