exports.handler = function(event, context, callback) {
    var source = "";
    var medium = "";
    var content = "";
    var term = "";
    var campaign = "";
    let call = event.activity;
    function getParameterByName(name, location) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name.toLowerCase() + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(location.toLowerCase());
        if (results === null) return "";
        else return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    
    var location = call.location;
    if (call.hasOwnProperty("last_location")){
      location = call.last_location;
    }
    
    if (getParameterByName("utm_source", location)) {
        source = getParameterByName("utm_source", location);
    }
    if (getParameterByName("utm_medium", location)) {
        medium = getParameterByName("utm_medium", location);
    }
    if (getParameterByName("utm_campaign", location)) {
        campaign = getParameterByName("utm_campaign", location);
    }
    if (getParameterByName("utm_term", location)) {
        term = getParameterByName("utm_term", location);
    }
    if (getParameterByName("utm_content", location)) {
        content = getParameterByName("utm_content", location);
    }
    
context.ctm.update({
    custom_fields: {
        utm_source: source,
        utm_medium: medium,
        utm_content: content,
        utm_term: term,
        utm_campaign: campaign
    }
}).then(function() {
    context.done();
}).catch(function() {
    console.error("something went wrong");
});
};
