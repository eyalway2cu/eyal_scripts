var threeprefix = ["050","052","053","054","055","055","055","055","055","055","056","058","059","072","072","073","073","073","074","076","076","077","079"];
var landline = ["09","08","04","03","02",];
var numbercheck = function(prefix) {
	return input.number.startsWith(prefix);
};
if (input.number.indexOf("-") > -1){
	var prefix = input.number.substr(0, number.indexOf('-'));
	var numberbody = input.number.substr(number.indexOf('-'), input.number.length).replace(/-/g, "");
	output = [{prefix: prefix, numberbody: numberbody}];
} else {
	if (landline.filter(numbercheck).length > 0){
		output = [{prefix: input.number.slice(0, 2), number: input.number.slice(2)}];
	} else {
		output = [{prefix: input.number.slice(0, 3), number: input.number.slice(3)}];
	}
}
