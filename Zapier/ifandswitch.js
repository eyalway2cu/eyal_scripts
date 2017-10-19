******************************************************************
// Matching exact string, if there is no match use second option
******************************************************************

if (input.variable == "your match") {
	output = [{variablename: "output text"}];
} else {
	output = [{variablename: "different output text"}];
}

******************************************************************
// Matching partial string, if there is no match use second option
******************************************************************

if (input.variable.indexOf("your match") > -1) {
	output = [{variablename: "output text"}];
} else {
	output = [{variablename: "different output text"}];
}


******************************************************************
// Switch, better to use when you have exact string matches
******************************************************************
switch(input.variable) {
    case "match one":
        output = [{variablename: "output text1"}];
        break;
    case "match two":
        output = [{variablename: "output text2"}];
        break;
    //if there are no matches this will be the output
    default:
        output = [{variablename: "output text3"}];
}
