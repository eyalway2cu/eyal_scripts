// Example 1 - replace input#form-field-user_agent with your own selector
document.querySelector("input#form-field-user_agent").setAttribute("value", navigator.userAgent);

// Example 2 - replace form-field-user_agent with your input id
document.getElementById("form-field-user_agent").value = navigator.userAgent;
