var POST_URL = "PUT IN YOUR WEBHOOK";
function onSubmit(e) {
    var form = FormApp.getActiveForm();
    var emailTo = []
    var responses=form.getResponses();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses();
    var payload = {};
    for (var i = 0; i < response.length; i++) {
        var question = response[i].getItem().getTitle();
        var answer = response[i].getResponse();
        var emailTo = responses[i].getRespondentEmail(); 
        var email = {email: emailTo}
        payload[question] = answer;
    }

    var options = {
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify([payload,email])
    };

    UrlFetchApp.fetch(POST_URL, options);
};


