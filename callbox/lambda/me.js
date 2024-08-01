const axios = require('axios');

exports.handler = async function(event, context, callback) {
    // Get the call information from the event
    let call = event.activity;
    
    // Define the phone, account_sid, and account_token based on the event or environment
    const phone = "972" + call.caller_number_bare || 'default_phone_number';
    const account_sid = process.env.sid || 'your_account_sid';
    const account_token = process.env.token || 'your_account_token';
    
    // Function to make a GET request to the API
    async function fetchData(phone, account_sid, account_token) {
        try {
            const url = `https://app.mobile.me.app/business-api/search?phone_number=${encodeURIComponent(phone)}&sid=${encodeURIComponent(account_sid)}&token=${encodeURIComponent(account_token)}`;
            
            const response = await axios.get(url);
            
            // Return the data from the response
            return response.data;
        } catch (error) {
            // Handle errors
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Error:', error.response.status, error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error('Error: No response received', error.request);
            } else {
                // Something else happened while setting up the request
                console.error('Error:', error.message);
            }
            throw error;
        }
    }
    
    // Use the fetchData function and handle the logic
    try {
        const data = await fetchData(phone, account_sid, account_token);
        
        // Determine the fullname based on the available data
        let fullname = data.common_name || data.me_profile_name;
        
        if (!fullname) {
            console.error('No valid name found in the response.');
            throw new Error('No valid name found in the response.');
        }
        
        // Run the context.ctm.update command with the fullname
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
        callback(error); // Use the callback to signal an error to AWS Lambda
    }
};
