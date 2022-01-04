// get querystring from URL
var query_string = new URL(window.location).searchParams;
// set the form field we would like to inject the data into
var form_field = document.querySelector('input#form-field-name');
// get the fbclid param from querystring
var click_id = query_string.get('fbclid');
// determine if you would like to clear the generated FBC from localStorage after the form is submitted
var clearls = false;
if (localStorage.getItem('fbc') === null) {
    // generate new id and store it for later use
    if (click_id) {
        var timestamp = +new Date();
        var fbc = `fb.1.${timestamp}.${click_id}`;
        localStorage.setItem('fbc', fbc);
        // assign value if field is present
        if (form_field) form_field.setAttribute('value', fbc);
    }
} else if (form_field) {
    // set field value from previously generated and stored one
    form_field.setAttribute('value', localStorage.getItem('fbc'));
}
// Clear fbc from localStorage after submission
if (clearls) {
    jQuery(document).ready(function($) {
        $(document).on('submit_success', function() {
            // form has been submitted do your thing
        });
    });
}
