exports.handler = function(event, context, callback) {
  let numbers = [
    "RPN34D8AC3F61E8848FEA641CEF711011AA28916C76261D79053DCE7A944234F13A",
    "RPN34D8AC3F61E8848FEA641CEF711011AA28916C76261D79050B50053CFCC56353",
    // Add more numbers as needed
  ];

  context.ctm.api_get("calls?per_page=100&direction[]=inbound&limit_fields[]=id&limit_fields[]=receiving_number_sid&limit_fields[]=unix_time").then((response) => {
    let data = JSON.parse(response.responseBody);
    data.calls.shift(); // This removes the first element from the array
    
    let lastCallTimestamps = numbers.reduce((acc, numberSid) => {
      acc[numberSid] = 0; // Initialize with a timestamp of 0
      return acc;
    }, {});

    // Update the last call timestamp for each numberSid
    data.calls.forEach(call => {
      if (numbers.includes(call.receiving_number_sid)) {
        let currentTimestamp = lastCallTimestamps[call.receiving_number_sid];
        let callTimestamp = call.unix_time;
        if (callTimestamp > currentTimestamp) {
          lastCallTimestamps[call.receiving_number_sid] = callTimestamp;
        }
      }
    });

    // Sort numbers by their last call timestamp to find the last called number
    let sortedNumbers = numbers.sort((a, b) => lastCallTimestamps[b] - lastCallTimestamps[a]);
    let lastCalledNumberIndex = numbers.indexOf(sortedNumbers[0]);
    let nextNumberIndex = (lastCalledNumberIndex + 1) % numbers.length;
    let nextNumberSid = numbers[nextNumberIndex];

    console.log("Routing to next number SID:", nextNumberSid); // For debugging

    // Proceed with routing to nextNumberSid
    context.done(null, {route: nextNumberSid});
  }).catch(error => {
    console.error("Error fetching calls:", error);
    context.done(error);
  });
};
