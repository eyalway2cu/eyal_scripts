function compareDates(event) {
  var now = new Date();
  var dateString = "18.1.2023, 0:14:05";
  var dateTimeParts = dateString.split(", ");
  var dateParts = dateTimeParts[0].split(".");
  var day = dateParts[0].length == 1 ? "0" + dateParts[0] : dateParts[0];
  var month = dateParts[1].length == 1 ? "0" + dateParts[1] : dateParts[1];
  var year = dateParts[2];
  var timeParts = dateTimeParts[1].split(":");
  var hours = timeParts[0].length == 1 ? "0" + timeParts[0] : timeParts[0];
  var minutes = timeParts[1].length == 1 ? "0" + timeParts[1] : timeParts[1];
  var seconds = "00";
  
  var dateFromSheet = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
  if(now.getDate() == dateFromSheet.getDate()&&dateFromSheet.getMinutes() == dateFromSheet.getMinutes()){
      //run code here
  }
}
