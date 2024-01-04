function appendDataToAnotherSheet() {
  // Source sheet
  let sourceSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let data = sourceSheet.getDataRange().getValues();
  let headers = data[0];
  let jsonData = [];

  // Filter and prepare data
  for (let i = 1; i < data.length; i++) {
    if (data[i][10] === "Active") { // Assuming column K is "Active"
      jsonData.push(data[i]);
    }
  }

  // Target sheet
  let targetSheetId = 'YOUR_TARGET_SHEET_ID'; // Replace with your target sheet ID
  let targetSheet = SpreadsheetApp.openById(targetSheetId).getActiveSheet();

  // Append data to the target sheet
  if (jsonData.length > 0) {
    targetSheet.getRange(targetSheet.getLastRow() + 1, 1, jsonData.length, jsonData[0].length).setValues(jsonData);
  }
}
