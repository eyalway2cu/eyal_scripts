if (document.location.pathname == "/") {
	// select the target node
	var target = document.querySelector('ul.tp-revslider-mainul');

	//jQuery("#rev_slider_4_1").append("<a class='callbox' style='position: absolute;z-index: 1000;color: white;background-color: #2275A9;top: 238px;right: 70px;font-size: 1.5em;letter-spacing: 1.5px;padding: 5px;' href='tel:072-260-8260'>072-260-8260</a>");
	// create an observer instance
	var observer = new MutationObserver(function(mutations) {
	    mutations.forEach(function(mutation) {
	    	var currentClassName = (mutation.target.className);
	        var dataIndex = (mutation.target.attributes[0].value);
	        var currentWidth = jQuery(mutation.target).width();
	    	if (currentWidth >= "1170"){
	    		jQuery("#rev_slider_4_1").append("<a class='callbox' style='position: absolute;z-index: 1000;color: white;background-color: #2275A9;top: 238px;right: 70px;font-size: 1.5em;letter-spacing: 1.5px;padding: 5px;' href='tel:072-260-8260'>072-260-8260</a>");
		        if ((dataIndex == "rs-18") && (currentClassName.indexOf("active") > -1)){
		       	jQuery("a.callbox").attr("style", "position: absolute;z-index: 1000;color: white;background-color: #2275A9;top: 238px;right: 70px;font-size: 1.5em;letter-spacing: 1.5px;padding: 5px;");
		        }else if ((dataIndex == "rs-19") && (currentClassName.indexOf("active") > -1)){
		       	jQuery("a.callbox").attr("style", "position: absolute;z-index: 1000;color: white;background-color: #1E3159;top: 320px;right: 70px;font-size: 1.5em;letter-spacing: 1.5px;padding: 5px;");
		        }
	  		} else {
	  			jQuery("a.callbox").remove();
	  		}
	    });
	});
	 
	// configuration of the observer:
	var config = { attributes: true, subtree: true, attributeFilter: ['class']};
	 
	// pass in the target node, as well as the observer options
	observer.observe(target, config);
}
