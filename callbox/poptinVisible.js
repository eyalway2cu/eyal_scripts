document.addEventListener("poptinView", function(event){
    let sidFields = document.querySelectorAll("input[name='sid']");
    sidFields.forEach(field => {
        field.setAttribute("value", __ctm.config.sid);
    });
}, false);
