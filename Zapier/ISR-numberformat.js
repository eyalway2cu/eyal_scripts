var number = input.number;

if (typeof number !== 'undefined') {
    var number = number.trim();
    number = number.replace(/\D/g,'');

    if (number.indexOf("972") == 0) {
        number = number.replace("972", "0");
    }
    if (number.indexOf("0") != 0) {
        number = "0" + number;
    }
    if (number.indexOf("00") == 0) {
        number = number.replace("00", "0");
    }
    output = [{
       number: number
    }];
}
