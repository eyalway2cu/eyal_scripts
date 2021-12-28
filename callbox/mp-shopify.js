exports.handler = function(event, context, callback) {
    var clientname = "Client Name";
    var uaid = "Analytics property id";
    var request = require("request");
    var call = event.activity;
    var orderid = false;
    if (call.custom_fields.hasOwnProperty('order_id')) {
        orderid = call.custom_fields.order_id;
    }
    var dl = "";
    var dh = "";
    var cid = "";
    if (call.hasOwnProperty('webvisit')) {
        dl = call.webvisit.location_path;
        dh = call.webvisit.location_host;
        cid = call.ga.cid.substring(6);
    }else{
        cid = call.ga.cid;
    }
    context.ctm.api_get(`shopify/customer_info?c_num=${call.caller_number_complete.substr(1)}`).then(function(response) {
        var shopify_payload = JSON.parse(response.responseBody);
        shopify_payload.customers[0].orders.forEach(function(order) {
            if (order.id == orderid) {
                var query = `?v=1&t=pageview&tid=${uaid}&cid=${cid}&dl=${dl}&dh=${dh}&pa=purchase&ti=${orderid}` + "&";
                var line_items = order.line_items;
                for (i = 0; i < line_items.length; i++) {
                    query += "pr" + (i + 1) + "id=" + line_items[i].sku + "&";
                    query += "pr" + (i + 1) + "nm=" + line_items[i].name + "&";
                    query += "pr" + (i + 1) + `br=${clientname}&`;
                    query += "pr" + (i + 1) + "qt=" + line_items[i].quantity + "&";
                    query += "pr" + (i + 1) + "pr=" + line_items[i].price;
                    if (i + 1 !== line_items.length) {
                        query += "&";
                    }
                }
                request.post({
                    url: "https://www.google-analytics.com/collect/" + encodeURI(query),
                    method: "GET"
                }, function(error, response, body) {
                    console.log(response);
                    console.log(body);
                    console.log(error);
                });
            }
        });
    });
};
