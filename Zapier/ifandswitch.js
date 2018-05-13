******************************************************************
// Matching exact string, if there is no match use second option
******************************************************************

if (input.variable == "your match") {
	variablename = "output text";
} else {
	variablename = "different output text";
}

******************************************************************
// Matching partial string, if there is no match use second option
******************************************************************

if (input.variable.indexOf("your match") > -1) {
	variablename = "output text";
} else {
	variablename = "different output text";
}


******************************************************************
// Switch, better to use when you have exact string matches
******************************************************************
switch(input.variable) {
    case "match one":
        variablename = "output text1";
        break;
    case "match two":
        variablename = "output text2";
        break;
    //if there are no matches this will be the output
    default:
        variablename = "output text3";
}

******************************************************************
// Output - once the process is done, output all the data
******************************************************************

output = [{variablename: variablename}];
