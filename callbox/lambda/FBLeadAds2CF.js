exports.handler = async (event, context) => {
  let call = event.activity;
  let campaign = "";
  let content = "";
  let term = "";
  if (call.hasOwnProperty("form")&&call.form.hasOwnProperty("custom")){
    call.form.custom.forEach(field  => {
      if(field.id == "api_campaign_name"){
        campaign = field.value;
      }
      if(field.id == "api_adset_name"){
        content = field.value;
      }
      if(field.id == "api_ad_name"){
        term = field.value;
      }
    });
    context.ctm.update({
        custom_fields: {
            utm_source: "Facebook",
            utm_medium: "Lead Ads",
            utm_campaign: campaign,
            utm_content: content,
            utm_term: term
        }
    }).then(function() {
        console.error("FB ppc data injected");
        context.done();
    }).catch(function() {
        console.error("something went wrong");
    });   
  }
};
