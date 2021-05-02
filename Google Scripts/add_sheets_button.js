function send2igmt(data){
  var rows = SpreadsheetApp.getActiveSheet().getDataRange().getValues();
  var text = "";
  for(i=0;i<rows.length;i++){
    text += rows[i].join();
    if (i !== rows.length){
      text += "\n";
    }
  }
  var url = "WEBHOOKURL";
  var options = {
      "method": "post",
      "payload": text,
      "muteHttpExceptions": true
  };
  options.headers = {
      "Content-type": "text/plain"
  };
  var response = UrlFetchApp.fetch(url, options);
}

function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Send data to Integromat', functionName: 'send2igmt'}
  ];
  spreadsheet.addMenu('Send_to_integromat', menuItems);
}
