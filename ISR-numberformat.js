var number = input.number;

if (typeof number !== 'undefined') {
    var number = number.trim();
    var number = number.replace(new RegExp('-', 'g'), '');

    if (number.indexOf("+") > -1) {
        number = number.replace("+", "");
    }
    if (number.indexOf("972") == 0) {
        number = number.replace("972", "0");
    }
    if (number.indexOf("0") != 0) {
        number = "0" + number;
    }
    output = [{
       number: number
    }];
}
