var number = input.number;

if (typeof number !== 'undefined') {
    var number = number.trim();
    var number = number.replace(/\D/g,'');

    if (number.indexOf("+") > -1) {
        number = number.replace("+", "");
    }
    if (number.indexOf("1") == 0) {
        number = number.replace("1", "");
    }
    output = [{
       number: number
    }];
}
