jQuery.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        jQuery.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

var myData = jQuery("form").serializeFormJSON();

myData.sid = __ctm.config.sid;

var url = "webhookurl";
jQuery.ajax({ 
	processData : false,
	url: url,
	type: 'post',
	data: JSON.stringify(myData),
	async: true,
	headers: {
		'Content-Type': 'application/json'
	},
	success: function(response){
	}
});
