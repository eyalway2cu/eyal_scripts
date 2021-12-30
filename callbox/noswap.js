var hrefLinks = document.querySelectorAll(`a[href^="tel:"]`);
var noswap = false;

if (document.location.href == "https://someurl.com"){
   noswap = true; 
}

if (document.location.pathname.indexOf("somepage") > -1){
    noswap = true;
}
if (noswap){
    if (hrefLinks){
        hrefLinks.forEach(function(link){
            link.setAttribute("class", "ctm-no-swap");
        });   
    }
}
