var swapStatus = false;
window.CTMSourceEvent = function(event) {
    if (event.state == "after"){
        if (!swapStatus){
            if (document.querySelector("#form-field-sid")){
                var forms = document.querySelectorAll("#form-field-sid");
                for (i=0;i<forms.length;i++){
                    forms[i].setAttribute("value", __ctm.config.sid);
                }
            }
            swapStatus = true;
        }
    }
};
