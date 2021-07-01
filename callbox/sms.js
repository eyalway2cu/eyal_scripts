exports.handler = function(event, context, callback) {
    var request = require("request");
    function sendSms(username, password, source, phone, message){
        var body = `<sms><user><username>${username}</username><password>${password}</password></user><source>${source}</source><destinations><phone>${phone}</phone></destinations><message>${message}</message><response>0</response></sms>`;    
        request.post({
            url: "https://019sms.co.il/api",
            port: 8090,
            method: "POST",
            headers: {
                'Content-Type': 'application/xml',
            },
            body: body
        }, function(error, response, body) {
            console.log(response.statusCode);
            console.log(body);
            console.log(error);
        });
    }
    let call = event.activity;
    var username = "";
    var password = "";
    var source = "";
    var phone = call.business_number.replace("+972", "0");
    var message = "התקבלה עכשיו שיחה שלא נענתה ממספר 0" + call.caller_number_bare;
    sendSms(username, password, source, phone, message);
};
