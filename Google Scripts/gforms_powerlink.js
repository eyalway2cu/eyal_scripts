var token = "XXX";
var objecttype = 1;

function plcreate(objecttype, data, token) {
    var url = "https://api.powerlink.co.il/api/record/" + objecttype;
    var options = {
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify(data),
        "muteHttpExceptions": true
    };
    options.headers = {
        "tokenid": token
    };
    var response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());
}

function plquery(objecttype, query, token) {
    var url = "https://api.powerlink.co.il/api/query";
    var options = {
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify({
            "objecttype": objecttype,
            "page_size": 500,
            "page_number": 1,
            "fields": "*",
            "query": query
        }),
        "muteHttpExceptions": true
    };
    options.headers = {
        "tokenid": token
    };
    var response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());
}

function onSubmit(e) {
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses();
    var payload = {};
    for (var i = 0; i < response.length; i++) {
        var question = response[i].getItem().getTitle();
        var answer = response[i].getResponse();
        payload[question] = answer;
    }
    Logger.log(JSON.stringify(payload));
    // sanitize number
    var number = payload["מספר טלפון"];
    var number = number.trim();
    number = number.replace(/\D/g, '');

    if (number.indexOf("972") == 0) {
        number = number.replace("972", "0");
    }
    if (number.indexOf("0") != 0) {
        number = "0" + number;
    }
    if (number.indexOf("00") == 0) {
        number = number.replace("00", "0");
    }
    var d = new Date(payload["תאריך לידה של ממלא.ת הטופס-"]);
    var birthday = d.toISOString().slice(0, -5);

    var family_status = "";
    switch (payload["מצב משפחתי"]) {
        case 'רווק/ה':
            family_status = "6";
            break;
        case 'בזוגיות':
            family_status = "7";
            break;
        case 'נשוי/ה':
            family_status = "2";
            break;
        case 'גרוש/ה':
            family_status = "1";
            break;
        case 'אלמנ/ה':
            family_status = "8";
            break;
    }

    var approach = "3";
    switch (payload["איך לפנות אליך?"]) {
        case 'בלשון נקבה':
            approach = "2";
            break;
        case 'בלשון זכר':
            approach = "1";
            break;
    }

    var migzar = "5";
    switch (payload["מגזר"]) {
        case 'יהודים':
            migzar = "1";
            break;
        case 'מוסלמים':
            migzar = "2";
            break;
        case 'נוצרים':
            migzar = "3";
            break;
        case 'דרוזים':
            migzar = "4";
            break;
    }

    var source = "";
    switch (payload["מקור הגעה"]) {
        case 'אינטרנט':
            source = "1";
            break;
        case 'רשות מקומית':
            source = "4";
            break;
        case 'המלצה':
            source = "6";
            break;
        case 'מפה לאוזן':
            source = "7";
            break;
        case 'אלמנייה':
            source = "8";
            break;
    }

    var sugpone = "";
    switch (payload["סוג הפונה- "]) {
        case 'אני הורה (או אפוטרופוס) המעוניין לרשום את ילדו.יו':
            sugpone = "1";
            break;
        case 'אני בן 13-18, איבדתי את אחד/ת מהוריי ומעוניין להירשם כחונך':
            sugpone = "4";
            break;
        case 'אני בן 13-18 (איני יתום) ומעוניין להירשם כחונך':
            sugpone = "4";
            break;
        case 'אני יועצת המעוניינת להפנות משפחה':
            sugpone = "6";
            break;
        case 'אני בן משפחה אחר המעוניין להפנות משפחה':
            sugpone = "5";
            break;
    }

    query = "(telephone1 = '" + number + "')";
    var pl_query_result = plquery(objecttype, query, token);
    if (!pl_query_result.data.Data || !pl_query_result.data.Data.length) {
      Logger.log("no user found");
      var data = {
        "accountname": payload["שם פרטי של ממלא הטופס"] + " " + payload["שם משפחה של ממלא הטופס"],
        "emailaddress1":  payload["Email address"],
        "pcfsystemfield425": approach,
        "pcfsystemfield542": migzar,
        "pcfsystemfield25": sugpone,
        "idnumber": payload["ת.ז"],
        "telephone1": number,
        "birthdaydate": birthday,
        "pcfsystemfield91": payload["מספר הילדים (במידה ואתה ההורה, כמה ילדים תרצה לרשום)"],
        "pcfsystemfield33": payload["גילאי הילדים"],
        "billingcity": payload["עיר מגורים"],
        "pcfsystemfield169": payload["רחוב "],
        "pcfsystemfield427": payload["מס' בית"],
        "pcfsystemfield431": payload["מקצוע/הכשרה"],
        "pcfsystemfield433": payload["מקום עבודה"],
        "pcfsystemfield435": payload["תפקיד במקום העבודה -"],
        "pcfsystemfield570": payload["עיר בה תרצו לקחת חלק בפעילות של חמניות"],
        "originatingleadcode":  source,
        "pcfsystemfield97": payload["שאלות, הערות והארות"]
      };
      Logger.log("data - ");
      //Logger.log(JSON.stringify(data));
      var pl_create_result = plcreate(objecttype, data, token);
      Logger.log("response - ");
      Logger.log(JSON.stringify(pl_create_result));
    }else{
      Logger.log("user exists");
    }

};
