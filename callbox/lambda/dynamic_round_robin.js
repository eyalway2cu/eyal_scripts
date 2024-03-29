exports.handler = function(event, context, callback) {
  let numbers = [
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29FE8F36C8777D5FF09",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29F709285EBBB54A798",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29F96595096A3816511",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29FC8B03ED9D70BBCD7",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29FC376C9C2E114AB21",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29FF91461E0B64328C2",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29FECB867452D9880F5",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29F119D022E7E03709C",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29FC15417788E9592C3",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29FA390BAD30E0F5FBA",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29F4AB403218D56DBDC",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29F904EE9F4EE2D70DA",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29F9003C2C19B39AF8E",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29F21C4ADD484BAB2DC",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29F88569D7F14C22F84",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29F087C406EFA80BE3B",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29FBDB3AA4288ADEF5E",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29F9C746D396AC39F8E",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29FA56342E9138E337C",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29F9AA6A295EB55FBD0",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29FC51D9152DAC481D2",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29FED02EB5F830DC6F0",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29F442E6900911F28D2",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29F31CFCDC444CB7F96",
    "RPN34D8AC3F61E8848FEA641CEF711011AAED4A1E9BA466F29F3BDAB1424CBC7641",
    "RPN34D8AC3F61E8848FEA641CEF711011AA4A580076DA2CAF202B0B0A58E46F109C",
    "RPN34D8AC3F61E8848FEA641CEF711011AA4A580076DA2CAF20FB36047CFF641D8B"
  ];

  context.ctm.api_get("calls?per_page=100&direction[]=inbound&limit_fields[]=id&limit_fields[]=receiving_number_sid&limit_fields[]=unix_time").then((response) => {
    let data = JSON.parse(response.responseBody);
    // data.calls.shift(); // Assuming the first call is the current call and should be ignored

    let lastCallTimestamps = numbers.reduce((acc, numberSid) => {
      acc[numberSid] = 0; // Initialize with a timestamp of 0
      return acc;
    }, {});

    data.calls.forEach(call => {
      if (numbers.includes(call.receiving_number_sid) && call.unix_time > lastCallTimestamps[call.receiving_number_sid]) {
        lastCallTimestamps[call.receiving_number_sid] = call.unix_time;
      }
    });

    // Find the last called number without sorting the original numbers array
    let lastCalledNumber = Object.entries(lastCallTimestamps).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    let lastCalledNumberIndex = numbers.indexOf(lastCalledNumber);
    let nextNumberIndex = (lastCalledNumberIndex + 1) % numbers.length;
    let nextNumberSid = numbers[nextNumberIndex];

    console.log("Routing to next number SID:", nextNumberSid); // For debugging

    context.done(null, {route: nextNumberSid});
  }).catch(error => {
    console.error("Error fetching calls:", error);
    context.done(error);
  });
};
