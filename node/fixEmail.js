const csv = require('csv-parser');
const fs = require('fs');
const http = require('http');
const mailcheck = require('mailcheck');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const writeData = [];
const filepath = "data.csv"
fs.createReadStream(filepath).on('error', () => {
    // handle error
}).pipe(csv()).on('data', (row) => {
    let email = `${row["Email"]}`;
    mailcheck.run({
        email: email,
        suggested: function(suggestion) {
            //console.log(suggestion.full);
            writeData.push({
                email: email,
                fixedemail: suggestion.full
            })
        },
        empty: function() {}
    });
}).on('end', () => {
    // handle end of CSV
    const csvWriter = createCsvWriter({
        path: 'datafixed.csv',
        header: [{
            id: 'email',
            title: 'Email'
        }, {
            id: 'fixedemail',
            title: 'FixedEmail'
        }, ]
    });
    console.log(writeData);
    csvWriter.writeRecords(writeData).then(() => console.log('The CSV file was written successfully'));
})
