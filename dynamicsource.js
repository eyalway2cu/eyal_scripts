// script for dynamic source insertion into hidden field
var sourcefield = document.querySelectorAll("input[name='source']");
var source = null;
var is_google = document.referrer.indexOf('google') > -1;
var is_facebook = document.referrer.indexOf('facebook') > -1;
var has_gclid = window.location.search.indexOf('gclid') > -1;

// assign source according to conditions
if (has_gclid)
    source = 'Adwords';
else if (is_google && !has_gclid)
    source = 'Organic';
else if (is_facebook)
    source = 'Facebook';
else
    source = 'Direct';

for (i = 0; i < sourcefield.length; i++){
	sourcefield[i].value = source;
}
