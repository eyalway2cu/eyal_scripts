//Set within Iframe
window.postMessage("conversion", "*");

//Set outside of Iframe
window.addEventListener("message", receiveMessage, false);

function receiveMessage(event){
	if (event.data == "conversion"){
		var image = new Image(1, 1); 
		image.src = "";
	}	
}
