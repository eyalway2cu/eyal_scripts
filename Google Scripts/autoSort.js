var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName("Sheet1");
var range = sheet.getRange("A2:AC");

function autoSort(e) {
    range.sort([{
        column: 1,
        ascending: false
    }]);
}
