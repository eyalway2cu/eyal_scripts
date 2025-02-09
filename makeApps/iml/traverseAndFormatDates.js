// a function to recursively format dates to your required output format
function traverseAndFormatDates(parameters) {
    const dateParameters = ["ValueDate", "ExtraDate1", "ExtraDate2", "DueDate", "DatF3", "DUEDATE"];
    Object.entries(parameters).forEach((entry) => {
            const [key, value] = entry;
            if(dateParameters.includes(key)){
                parameters[key] = iml.formatDate(parameters[key], 'YYYY-MM-DD');
            }else if(value && typeof value === 'object') {
                parameters[key] = iml.traverseAndFormatDates(value);
            }        
        })
    return parameters;
}
