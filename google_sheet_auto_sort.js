/**
* Sorts a sheet by a column in acsending order.
* To sort automatically when a form response is received, set up a trigger like this:
* Tools > Script editor > Resources > Current project's triggers > add new one >
* sortFormResponsesSheet > From spreadsheet > On edit > Save
*/

var sheetToSort = "Sheet1"; // replace this with the name of your sheet
var columnToSortBy = 1; // column A = 1, B = 2, etc.
var rangeToSort = "A2:T";

function onEdit() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var editedCell = sheet.getActiveCell();
  if (editedCell.getColumn() == columnToSortBy && sheet.getName() == sheetToSort) {
    sortFormResponsesSheet();
  }
}

function sortFormResponsesSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetToSort);
  var range = sheet.getRange(rangeToSort);
  range.sort( { column : columnToSortBy, ascending: true } );
}
