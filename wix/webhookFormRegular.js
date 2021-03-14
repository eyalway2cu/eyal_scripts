export function FORMID_wixFormSubmitted(event) {
	var obj = {};
	var i = 0;
	for (i=0;i<event.fields.length;i++){
		obj[event.fields[i].id] = event.fields[i].fieldValue;
	}
	//console.log(obj);
	fetch( "WEBHOOKURL", {
	"method": "post",
	"headers": {
		"Content-Type": "application/json"
	},
	"body": JSON.stringify(obj)
	} )
	.then( (httpResponse) => {
		if (httpResponse.ok) {
		return httpResponse.json();
		} else {
		return Promise.reject("Fetch did not succeed");
		}
	} )
	.then( (json) => console.log(json) )
	.catch(err => console.log(err));
}
