window.visits = window.visits || [];

var visitCount = parseInt(localStorage.getItem("visit-count"));

if (localStorage.getItem("visit-count") == null) {
	localStorage.setItem("visit-count", 1 );
} else {
	localStorage.setItem("visit-count", ++visitCount);
}

visits.push({
	page: document.location.href,
	referrer: document.referrer,
	title: document.title, 
	time:new Date()
});
