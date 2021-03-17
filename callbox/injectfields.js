exports.handler = function(event, context, callback) {
    let call = event.activity;
    context.ctm.update({
        custom_fields: {
            fieldname: 'value
        }
    }).then(function() {
        console.log("fields injected");
        context.done();
    }).catch(function() {
        console.error("something went wrong");
    });
};
