var swapStatus = false;
window.CTMSourceEvent = function(event) {
    if (event.state == "after"){
        if (!swapStatus){
            for (i=0;i<forms.length;i++){
                if (forms[i].querySelector("input[name='sid']")){
                    forms[i].querySelector("input[name='sid']").setAttribute("value", __ctm.config.sid);
                }
            }
            swapStatus = true;
        }
    }
};
