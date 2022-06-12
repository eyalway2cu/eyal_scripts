exports.handler = function(event, context, callback) {
    var request = require("request");
    var call = event.activity;
    var clientname = "Client Name";
    var uaid = "UA-XXXXXXX-1";
    var ec = "Ecommerce";
    var ea = "Transaction";
    var base_url = "yourwpsite.com";
    var consumer_key = "XXXXX";
    var consumer_secret = "XXXXXX";

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

      request(`https://${base_url}/wp-json/wc/v3/orders/${orderid}?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`, function (error, response, body) {
      var wc_payload = JSON.parse(body);
      console.log(wc_payload);
      var order_number = parseInt(wc_payload.number);
          if (order_number == orderid) {
              var query = `?v=1&t=event&ec=${ec}&ea=${ea}&tid=${uaid}&cid=${cid}&dh=${dh}&dp=${dl}&pa=purchase&ti=${orderid}` + "&ds=callbox&";
              for (i = 0; i < wc_payload.line_items.length; i++) {
                  query += "pr" + (i + 1) + "id=" + wc_payload.line_items[i].id + "&";
                  query += "pr" + (i + 1) + "nm=" + wc_payload.line_items[i].name + "&";
                  query += "pr" + (i + 1) + `br=${clientname}&`;
                  query += "pr" + (i + 1) + "qt=" + wc_payload.line_items[i].quantity + "&";
                  query += "pr" + (i + 1) + "pr=" + wc_payload.line_items[i].total;
                  if (i + 1 !== wc_payload.line_items.length) {
                      query += "&";
                  }
              }
              console.log("https://www.google-analytics.com/collect" + encodeURI(query));
              request.post({
                  url: "https://www.google-analytics.com/collect" + encodeURI(query),
                  method: "GET"
              }, function(error, response, body) {
                  //console.log(response);
                  // console.log(body);
                  // console.log(error);
              });
          }

    });
};
