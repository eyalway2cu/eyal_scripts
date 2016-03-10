var exitIntentTriggerInterval = window.setInterval( function() {
   if (!document.getElementById("revexitmask")) {
   		console.log("no exit intent displayed");
	} else{
		console.log("exit intent is displayed");
	}
  }, 500 );
  
exitIntentTriggerInterval;