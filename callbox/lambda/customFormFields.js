exports.handler = async (event, context) => {
  let call = event.activity;

  function convertCustomField(jsonData) {
      let customArray = jsonData.form.custom;
      let customObject = {};
    
      for (let i = 0; i < customArray.length; i++) {
          let id = customArray[i].id;
          let value = customArray[i].value;
          customObject[id] = value;
      }
    
      return customObject;
  }
  
  if (call.direction == "form"){
    let cff = convertCustomField(call);
    if (cff.hasOwnProperty("SourceId1")&&cff.hasOwnProperty("SourceId2")){
      context.ctm.update({
      custom_fields: {
          source_id_1: cff.SourceId1,
          source_id_2: cff.SourceId2
      }
      }).then(function() {
          console.log("Source Id Injected");
          context.done();
      }).catch(function() {
          console.error("error");
      });  
    }
  }
};
