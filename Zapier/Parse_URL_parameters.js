//Code by zapier snippet to pull UTM values from a URL querystring

//**Important**
// You must call the input variable "location" for this to work
//**Important**

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name.toLowerCase() + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(input.location.toLowerCase());
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

var utm_source = "";
if (getParameterByName("utm_source")) {
    utm_source = getParameterByName("utm_source");
}

var utm_medium = "";
if (getParameterByName("utm_medium")) {
    utm_medium = getParameterByName("utm_medium");
}

var utm_campaign = "";
if (getParameterByName("utm_campaign")) {
    utm_campaign = getParameterByName("utm_campaign");
}

var utm_term = "";
if (getParameterByName("utm_term")) {
    utm_term = getParameterByName("utm_term");
}

var utm_content = "";
if (getParameterByName("utm_content")) {
    utm_content = getParameterByName("utm_content");
}


output = [{
    utm_source: utm_source,
    utm_medium: utm_medium,
    utm_campaign: utm_campaign,
    utm_term: utm_term,
    utm_content: utm_content
}];
