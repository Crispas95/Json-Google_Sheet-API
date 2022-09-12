const express = require ('express');
const app = express();
const fs = require ('fs');
const {request} = require('gaxios');
const {google} = require('googleapis');
const {googleAuth, GoogleAuth} = require('google-auth-library');
const PORT = 3001;
const bodyParser = require('body-parser')
app.use(bodyParser.json())


const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

app.post('/sheet',(req,res)=>{
const payload = req.body;
const writeToSheet= async ()=>{

async function sheetsAutomate(){
    const auth = new GoogleAuth({
        keyFile: './credentials.json',
        scopes: SCOPES
    });
   const client = await auth.getClient();

   const sheets = google.sheets({version:'v4',auth: client});

   const rowsToBeAdded = {
    "majorDimension": "ROWS",
    values: [[payload.contact.name,payload.contact.urn,payload.contact.uuid,payload.flow.name,payload.flow.uuid,
    payload.flow.name,payload.flow.uuid,
    payload.results.category.category,payload.results.category.value,
    payload.results.children0_11hasreceivedopv.category,payload.results.children0_11hasreceivedopv.value,
    payload.results.children0_11neverreceivedopv.category,payload.results.children0_11neverreceivedopv.value,
    payload.results.children_12_59hasreceivedopv.category,payload.results.children_12_59hasreceivedopv.value,
    payload.results.children_12_59neverreceivedopv.category,payload.results.children_12_59neverreceivedopv.value,
    payload.results.day.category,payload.results.day.value,
    payload.results.household.category,payload.results.household.value,
    payload.results.result_15.category,payload.results.result_15.value,
    payload.results.result_17.category,payload.results.result_17.value,
    payload.results.result_18.category,payload.results.result_18.value,
    payload.results.totalmissing.category,payload.results.totalmissing.value,
    payload.results.totalreturnedunopened_unusable.category,payload.results.totalreturnedunopened_unusable.value,
    payload.results.totalreturnedunopened_usable.category,payload.results.totalreturnedunopened_usable.value,
    payload.results.totalsuspectedafpcases.category,payload.results.totalsuspectedafpcases.value,
    payload.results.totalvialsreturnedopened.category,payload.results.totalvialsreturnedopened.value,
    payload.results.totalvialswerereceived.category,payload.results.totalvialswerereceived.value]]
  }

   try{
     await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId: '1YkZta1-y71CcxrgOqXqUtt6n7Vqu3eSn2VGjZxjtg6s',
        range: 'Sheet1!A:R',
        valueInputOption: 'USER_ENTERED',
        resource: rowsToBeAdded,

     });
   }catch(err){
    console.log(err);
   }

}
sheetsAutomate();
}



writeToSheet();
res.status(201).json({
    message: "Payload Received",
});
});

app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`);
})
