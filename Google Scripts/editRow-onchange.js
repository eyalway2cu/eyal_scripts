function editRow(e){
  if(e.changeType=="EDIT" || e.changeType=="INSERT_ROW"){ //The type of change (EDIT, INSERT_ROW, INSERT_COLUMN, REMOVE_ROW, REMOVE_COLUMN, INSERT_GRID, REMOVE_GRID, FORMAT, or OTHER)
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); //get activated Spreadsheet
    var sheet = spreadsheet.getSheetByName("YOURSHEETNAME"); //get sheet by sheet name
    var headings = sheet.getDataRange().offset(0, 0, 1).getValues()[0]; //get heading
    var column_to_watch = 3; //A=1, B=2, C=3 etc...
    
    var row = sheet.getActiveRange().getRow();
    var column = sheet.getActiveRange().getColumn();
    
    if (e.changeType=="EDIT" && column != column_to_watch)
      return;
    
    var values = sheet.getSheetValues(
        row, // starting row
        1, // starting column
        1, // number of rows
        3 // number of columns
    );
    
    var payload ={}
    
    for (i = 0; i < headings.length; i++) {
      var name = headings[i];
      var value = values[0][i];
      payload[name] = value;
    }
    payload["row_number"] = row;
    
    var options = {
        'method': 'post',
        'contentType': 'application/json',
        'payload': JSON.stringify(payload)
    };
    UrlFetchApp.fetch('yourwebhookurl', options);
  }
}
