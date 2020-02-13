import wixCrm from 'wix-crm-backend';
import { fetch } from 'wix-fetch';

function sendData(item) {
    fetch("YOURWEBHOOKADDRESS", {
            "method": "post",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(item)
        })
        .then((httpResponse) => {
            if (httpResponse.ok) {
                return httpResponse.json();
            } else {
                return Promise.reject("Fetch did not succeed");
            }
        })
        .then((json) => console.log(json))
        .catch(err => console.log(err));
}


export function datasetname_afterInsert(item, context) {
	sendData(item);
	return item
}
