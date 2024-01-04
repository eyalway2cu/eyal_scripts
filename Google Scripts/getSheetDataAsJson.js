function getSheetDataAsJson() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let data = sheet.getDataRange().getValues();
  let headers = data[0];
  let jsonData = [];

  for (let i = 1; i < data.length; i++) {
    let row = data[i];
    
    // Check if the value in column K is "Active"
    if (row[10] === "Active") {
      let jsonRow = {};
      for (let j = 0; j < row.length; j++) {
        jsonRow[headers[j]] = row[j];
      }
      jsonData.push(jsonRow);
    }
  }
  return jsonData;
}
