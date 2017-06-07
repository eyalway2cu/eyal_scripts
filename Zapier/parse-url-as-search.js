// Function to parse string as URL as used in Zapier
function getParameterByName (name) 
{
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name.toLowerCase() + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(input.location.toLowerCase());
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
