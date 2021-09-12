var swapStatus = false;
window.CTMSourceEvent = function(event) {
    if (event.state == "after"){
        if (!swapStatus){
           __ctm_cvars.push({"userAgent": navigator.userAgent});
           swapStatus = true;
        }
    }
};
