exports.handler = function(event, context, callback) {
    var request = require("request");
    var formid = "{formid}";
    var token = "{token}";
    function sendForm(formid, body, token){
        request.post({
            url: "https://api.callbox.co.il/api/v1/formreactor/" + formid,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token
            },
            body: JSON.stringify(body)
        }, function(error, response, body) {
            console.log(body);
            console.log(error);
        });
    }
    let call = event.activity;
    var body = {
    	"unique_form_id":	formid,
    	"country_code":	"972",
    	"phone_number":	"0" + call.caller_number_bare
    };
    sendForm(formid, body, token);
};
