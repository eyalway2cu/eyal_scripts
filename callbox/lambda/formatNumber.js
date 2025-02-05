exports.handler = function(event, context, callback) {
    let call = event.activity;
    let numArr = call.caller_number_bare.split("");
    if (numArr.length == 9){
      numArr.splice(2, 0, "-");
    }else{
      numArr.splice(1, 0, "-");
    }
    context.ctm.update({
        custom_fields: {
            formatted_number: "0" + numArr.join("")
        }
    }).then(function() {
        console.log("formatted_number injected");
        context.done();
    }).catch(function() {
        console.error("something went wrong");
    });
};
