// function to get url variables
function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

//function to inject fbc field into form
function injectToField(formField){
    if (formField){
        formField.setAttribute("value", localStorage.getItem("fbc"));
    }
}

// set the field we want to inject the value into
var formField = false;
var elementSelector = "input#form-field-name";
if (document.querySelector(elementSelector)){
    formField = document.querySelector(elementSelector);
}

// handle injection
if(localStorage.getItem("fbc") === null){
    var timestamp = + new Date();
    localStorage.setItem("fbc", `fb.1.${timestamp}.${getQueryVariable("fbclid")}`);
    injectToField(formField);
}else{
    injectToField(formField);
}
