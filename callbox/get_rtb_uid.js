function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function onCookieChange(cookieName, callback, interval = 1000) {
    let lastValue = getCookie(cookieName);
    setInterval(() => {
        const newValue = getCookie(cookieName);
        if (newValue !== lastValue) {
            lastValue = newValue;
            callback(newValue);
        }
    }, interval);
}

function onLocalStorageChange(keyName, callback, interval = 1000) {
    let lastValue = localStorage.getItem(keyName);
    setInterval(() => {
        const newValue = localStorage.getItem(keyName);
        if (newValue !== lastValue) {
            lastValue = newValue;
            callback(newValue);
        }
    }, interval);
}

function handleRtbhUidChange(newValue) {
    if (newValue) {
        let uidobj = JSON.parse(decodeURIComponent(newValue));
        // use uidobj.id to get the UID, in this case it pushes the uid into Callbox custom variables.
        __ctm_cvars.push({"rtb_uid": uidobj.id});
    }
}

// Monitor cookie changes
onCookieChange('__rtbh.uid', (newValue) => {
    handleRtbhUidChange(getCookie("__rtbh.uid"));
});

// Monitor local storage changes
onLocalStorageChange('__rtbh.uid', (newValue) => {
    handleRtbhUidChange(localStorage.getItem("__rtbh.uid"));
});
