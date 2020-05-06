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
