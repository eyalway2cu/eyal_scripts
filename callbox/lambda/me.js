const axios = require('axios');

exports.handler = async function(event, context, callback) {
    let call = event.activity;
    
    const phone = "972" + call.caller_number_bare;
    const account_sid = process.env.sid;
    const account_token = process.env.token;
    
    async function fetchData(phone, account_sid, account_token) {
        try {
            const url = `https://app.mobile.me.app/business-api/search?phone_number=${encodeURIComponent(phone)}&sid=${encodeURIComponent(account_sid)}&token=${encodeURIComponent(account_token)}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // Handle errors
            if (error.response) {
                console.error('Error:', error.response.status, error.response.data);
            } else if (error.request) {
                console.error('Error: No response received', error.request);
            } else {
                console.error('Error:', error.message);
            }
            throw error;
        }
    }

    try {
        const data = await fetchData(phone, account_sid, account_token);
        let fullname = data.common_name || data.me_profile_name;
        
        if (!fullname) {
            console.error('No valid name found in the response.');
            throw new Error('No valid name found in the response.');
        }
        
        context.ctm.update({
            name: fullname
        }).then(function() {
            console.log(`${fullname} injected`);
            context.done();
        }).catch(function() {
            console.error("Something went wrong");
        });
    } catch (error) {
        console.error('Failed to fetch data:', error.message);
    }
};
