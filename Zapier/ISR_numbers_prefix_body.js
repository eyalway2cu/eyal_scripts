var number = input.number;
if (number.indexOf("+972") > -1){
	number = number.replace("+972", "0");
}

var threeprefix = ["050","052","053","054","055","055","055","055","055","055","056","058","059","072","072","073","073","073","074","076","076","077","079"];
var landline = ["09","08","04","03","02",];
var numbercheck = function(prefix) {
	return number.startsWith(prefix);
};
if (number.indexOf("-") > -1){
	var prefix = number.substr(0, number.indexOf('-'));
	var numberbody = number.substr(number.indexOf('-'), number.length).replace(/-/g, "");
	output = [{prefix: prefix, number: numberbody}];
} else {
	if (landline.filter(numbercheck).length > 0){
		output = [{prefix: number.slice(0, 2), number: number.slice(2)}];
	} else {
		output = [{prefix: number.slice(0, 3), number: number.slice(3)}];
	}
}
