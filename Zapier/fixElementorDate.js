var date = input.date;
var parts = date.split(" ");
var month = "";
switch(parts[0]){
	case "בינואר":
		month = "01";
		break;
	case "בפברואר":
		month = "02";
		break;
	case "במרץ":
		month = "03";
		break;
	case "באפריל":
		month = "04";
		break;
	case "במאי":
		month = "05";
		break;
	case "ביוני":
		month = "06";
		break;
	case "ביולי":
		month = "07";
		break;
	case "באוגוסט":
		month = "08";
		break;
	case "בספטמבר":
		month = "09";
		break;
	case "באוקטובר":
		month = "10";
		break;
	case "בנובמבר":
		month = "11";
		break;
	case "בדצמבר":
		month = "12";
		break;
	case "ינואר":
		month = "01";
		break;
	case "פברואר":
		month = "02";
		break;
	case "מרץ":
		month = "03";
		break;
	case "אפריל":
		month = "04";
		break;
	case "מאי":
		month = "05";
		break;
	case "יוני":
		month = "06";
		break;
	case "יולי":
		month = "07";
		break;
	case "אוגוסט":
		month = "08";
		break;
	case "ספטמבר":
		month = "09";
		break;
	case "אוקטובר":
		month = "10";
		break;
	case "נובמבר":
		month = "11";
		break;
	case "דצמבר":
		month = "12";
		break;
}
var formatted = parts[2] + "-" + month + "-" + parts[1];
output = [{
   date: formatted.replace(",", "");
}];
