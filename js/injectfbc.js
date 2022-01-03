function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

var fbc = "";
var timestamp = + new Date();
if (getQueryVariable("fbclid")){
    fbc = `fb.1.${timestamp}.${getQueryVariable("fbclid")}`;
    if (document.querySelector("input#fbc")){
        document.querySelector("input#fbc").setAttribute("value", fbc);
    }
}
