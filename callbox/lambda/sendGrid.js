exports.handler = function(event, context, callback) {
    var request = require("request");
    function sendEmail(email1, email2, call, token){
        var body = {
        	personalizations: [
        		{
        			to: [
        				{
        					email: email1
        				}
        			],
        			cc: [
        				{
        					email: email2
        				}
        			]
        		}
        	],
        	from: {
        		email: "leads@callbox.co.il"
        	},
        	subject: "New Form Lead",
        	content: [
        		{
        			type: "text/plain",
        			value: `Name: ${call.name}\nPhone Number: ${call.caller_number}\nEmail: ${call.email}\nCountry: ${call.country}\nSubject: ${call.custom_fields.subject}\nCompany: ${call.custom_fields.company}\nDescription: ${call.custom_fields.description}\n`
                }
        	]
        };
        request.post({
            url: "https://api.sendgrid.com/v3/mail/send",
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(body)
        }, function(error, response, body) {
            console.log(response);
            console.log(body);
            console.log(error);
        });
    }
    let call = event.activity;
    let token = "SENDGRIDTOKEN";
    sendEmail(call.custom_fields.forwardMailsToasf, call.custom_fields.forwardMailsSelectedBox, call, token);
};
