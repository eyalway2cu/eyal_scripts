window.addEventListener('flashyPopupShowed', ev => {
    const shadowHost = document.querySelector('flashy-popup');
    var forms = shadowHost.shadowRoot.querySelectorAll("form");
    for (i=0;i<forms.length;i++){
        if (forms[i].querySelector("input[title='sid']")){
            forms[i].querySelector("input[title='sid']").setAttribute("value", __ctm.config.sid);
        }
    }
});
