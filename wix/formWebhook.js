import wixCrm from 'wix-crm-backend';
import { fetch } from 'wix-fetch';

function sendData(item) {
//replace YOURWEBHOOKADDRESS with a webhook address (i.e https://somewebsite.com)
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

//replace datasetname with your dataset name, if your dataset is called submissions then you change the function name to submissions_afterInsert
export function datasetname_afterInsert(item, context) {
	sendData(item);
	return item
}
