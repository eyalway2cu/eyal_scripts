exports.handler = function(event, context, callback) {
  var request = require("request");
  var call = event.activity;
  var data = {
    v: 1,
    tid: "UA-139438598-5",
    cid: call.ga.cid.substring(6),
    t: "event",
    ec: "Lead",
    ea: "Update",
    el: call.custom_fields.status,
    ev: 1,
    ni: 1,
    ds: "web",
    uip: call.visitor_ip,
    dl: call.location,
    dh: call.webvisit.location_host,
    cd1: call.custom_fields.leadid
  };
  function jsonToQueryString(json) {
      return '?' + 
          Object.keys(json).map(function(key) {
              return encodeURIComponent(key) + '=' +
                  encodeURIComponent(json[key]);
          }).join('&');
  }
  var queryString = jsonToQueryString(data);
  console.log(queryString);
  request.post({
            url: "https://www.google-analytics.com/collect" + queryString,
            method: "GET"
        }, function(error, response, body) {
            console.log(response);
            console.log(body);
        });
};
