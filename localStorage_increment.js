// Using localStorage to measure interactions, set this as custom html tag in GTM while setting your trigger to determine incrementation   
var attempts = Number(localStorage.getItem("attempts"));
if (attempts == null) {
	localStorage.setItem("attempts", "1");
} else {
	localStorage.setItem("attempts", ++attempts);
}

if (attempts == 4) {
	// Fire anything you would like after 4th interaction
	console.log("4th interaction");
	//dataLayer.push({"event": "4th_interaction"});
	//reset attempts (optional)
	localStorage.removeItem("attempts");
	
}