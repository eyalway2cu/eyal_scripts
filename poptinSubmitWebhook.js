//This code will grab submission data from a Poptin form and submit the data in JSON format to your selected endpoint.

//If you encounter CORS issues, make sure you set the appropriate accept headers in your endpoint such as:
//Access-Control-Allow-Origin: *
//Access-Control-Allow-Methods: GET, POST, OPTIONS
//Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept

var data = {};
for (i=0;i<poptinSubmitted["YOURPOPUPID"].fields.length;i++){
    data[poptinSubmitted["YOURPOPUPID"].fields[i].name] = poptinSubmitted["YOURPOPUPID"].fields[i].value;
}
fetch('YOUR WEBHOOK URL', {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, /',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then(res=>res.json())
  .then(res => console.log(res));
