function editRow(event) {
    var sheet = event.source; //get sheet
    var sheetname = sheet.getSheetName();//get sheet name
    if (sheetname != "sheetname")//condition to match certain sheet comment out if not required
      return;
    var headings = sheet.getDataRange().offset(0, 0, 1).getValues()[0]; //get heading
    var edit_range = event.range; //get edited range
    var column_to_watch = 3; //A=1, B=2, C=3 etc...
    if (edit_range.getColumn() != column_to_watch)
        return;
    var row = edit_range.getRow();
    var values = sheet.getSheetValues(
        row, // starting row
        1, // starting column
        1, // number of rows
        4 // number of columns
    );
    var payload = {};
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
    UrlFetchApp.fetch('https://hook.integromat.com/fnrn3e6ia655rhkus5vjp8i4fri9sd28', options);
}
