var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        dataLayer.push({'event': 'formSubmit'});
    });    
});
 
var target = document.getElementById('loggedIn');
observer.observe(target, { attributes : true, attributeFilter : ['style'] });