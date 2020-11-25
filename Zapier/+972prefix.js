var number = input.number;

if (typeof number !== 'undefined') {
    var number = number.trim();
    var number = number.replace(new RegExp('-', 'g'), '');
    var number = number.replace(/\D/g,'');

    if (number.indexOf("0") == 0) {
        number = number.replace("0", "+972");
    }
    if (number.indexOf("00") == 0) {
        number = number.replace("00", "+972");
    }
    output = [{
       number: number
    }];
}
