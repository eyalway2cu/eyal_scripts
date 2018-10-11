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

if (getParameterByName("utm_source")) {
    var utm_source = getParameterByName("utm_source");
} else {
    var utm_source = "";
}

if (getParameterByName("utm_medium")) {
    var utm_medium = getParameterByName("utm_medium");
} else {
    var utm_medium = "";
}

if (getParameterByName("utm_campaign")) {
    var utm_campaign = getParameterByName("utm_campagin");
} else {
    var utm_campaign = "";
}

if (getParameterByName("utm_term")) {
    var utm_term = getParameterByName("utm_term");
} else {
    var utm_term = "";
}

if (getParameterByName("utm_content")) {
    var utm_content = getParameterByName("utm_content");
} else {
    var utm_content = "";
}


output = [{
    utm_source: utm_source,
    utm_medium: utm_medium,
    utm_campaign: utm_campaign
    utm_term: utm_term,
    utm_content: utm_content
}];
