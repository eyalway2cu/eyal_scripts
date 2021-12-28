exports.handler = function(event, context, callback) {
  
var request = require("request");
var call = event.activity;
var orderid = false;
if (call.custom_fields.hasOwnProperty('order_id')){
  orderid = call.custom_fields.order_id;
}

context.ctm.api_get(`shopify/customer_info?c_num=${call.caller_number_complete.substr(1)}`).then(function(response) {
  // console.log(typeof response);
  var shopify_payload = JSON.parse(response.responseBody);
  //console.log(shopify_payload);
  shopify_payload.customers[0].orders.forEach(function(order){
    if (order.id == orderid){
        var query = `?v=1&t=pageview&tid=UA-72076916-1&cid=${call.ga.cid.substring(6)}&dl=${call.webvisit.location_path}&dh=${call.webvisit.location_host}&pa=purchase&ti=${orderid}` +"&";
        console.log(query);
        var line_items = order.line_items;
        
        for (i=0;i<line_items.length;i++){
            query += "pr" + (i+1) + "id=" + line_items[i].sku + "&";
            query += "pr" + (i+1) + "nm=" + line_items[i].name + "&";
            query += "pr" + (i+1) + "br=Adita&";
            query += "pr" + (i+1) + "qt=" + line_items[i].quantity + "&";
            query += "pr" + (i+1) + "pr=" + line_items[i].price;
            if (i+1 !== line_items.length){
              query += "&";
            }
        }
        console.log("https://www.google-analytics.com/debug/collect" + encodeURI(query));
        request.post({
          url: "https://www.google-analytics.com/collect/" + encodeURI(query),
          method: "GET"
        }, function(error, response, body) {
          // console.log(response);
          // console.log(body);
          // console.log(error);
        });
    }
  });
});
};
