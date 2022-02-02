let table = base.getTable("Orders");
let record = await input.recordAsync('Pick a record', table);
let obj = {};
for (i=0; i<table.fields.length;i++){
    obj[table.fields[i].name] = record.getCellValueAsString(table.fields[i].name)
}
let response = await fetch(
    "https://whatever.com",
    {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(obj)
    }
);
