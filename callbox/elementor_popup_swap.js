var swapStatus = false;
window.CTMSourceEvent = function(event) {
    if (event.state == "after"){
        if (!swapStatus){
            jQuery(document).on('elementor/popup/show', () => {
            	__ctm.main.runNow();
            });
            swapStatus = true;
        }
    }
};
