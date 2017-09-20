# Using `create-react-app` with React Router + Express.js

**:warning: This is outdated, please refer to the official and new [react-router docs](https://reacttraining.com/react-router/)**

See : https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d

## Development

Clone this repository:

```sh
git clone https://github.com/mrpatiwi/routed-react.git
cd routed-react
```

Install dependencies:

```sh
npm install
```

Start the project at [`http://localhost:3000`](http://localhost:3000).

```sh
npm start
```

## Running with Docker

Be sure to install Docker and start a Docker-machine if necessary.

Let's create an image named `routed-react`:

```sh
docker build -t routed-react .
```

Finally, start a container named `routed-react-instance` at port `80`.

```sh
docker run -p 80:9000 --name routed-react-instance routed-react
```

## Testing

```sh
npm test
```

//applyMiddleware
http://redux.js.org/docs/api/applyMiddleware.html

//redux thunk
https://github.com/gaearon/redux-thunk

//redux dev tools
https://medium.com/@e_himmelfarb/implement-redux-devtools-extension-with-thunk-and-other-async-middleware-20e97100b2b0

//jsx conditional rendering
http://devnacho.com/2016/02/15/different-ways-to-add-if-else-statements-in-JSX/


//jsforce resources
https://github.com/jsforce/jsforce/issues/242
https://github.com/jsforce/jsforce/issues/660
https://github.com/jsforce/jsforce/issues/196
https://github.com/jsforce/jsforce/issues


//alternate to js force?
https://www.npmjs.com/package/node-salesforce

//good example repository
https://github.com/gbockus/jsForceInAction


//how to server react client from express backend
https://www.codeproject.com/Articles/1191715/Create-React-App-with-Express-in-Production


//jforce querys and commands to do certain things
*List of Cases by accounts
SELECT Name, Id, (SELECT Id, AccountId, CaseNumber FROM Cases) FROM Account WHERE Id IN (SELECT AccountId FROM Case)

*List of cases for specific accounts
SELECT Name, Id, (SELECT Id, AccountId, CaseNumber FROM Cases) FROM Account WHERE Id = '0014100000DOaXBAA1' AND Id IN (SELECT AccountId FROM Case)

*//how to parse the results of the above call to get the list of Cases
res.records.map(cases =>  cases.Cases.records);

//get account Id by URL

var w = "SELECT Id FROM Account WHERE WebSite = 'www.email.com'";
var x = '';
query(w).then(res => {x = res.records[0].Id});
console.log(x);

var w = "SELECT Id FROM Account WHERE WebSite = 'www.email.com'";
var x = '';
query(w).then(res => {x = res.records[0].Id; return x}).then(res => {var y=res.toString; var z = "SELECT Name FROM Account Where Id= '" + y + "'"; query(z)}).then(res => console.log(res.records));
k


var w = "SELECT Id FROM Account WHERE WebSite = 'www.email.com'";
var x = '';
query(w).then(res => {x = res.records[0].Id; return x}).then(res => {var y= res; var p c = {
     AccountId: c,
      Origin: "Web",
      Subject: "Test from CLI #1",
      Description: "This is a test from the CLI tool",
      SuppliedName: "David Lake",
      SuppliedEmail: "cli@cli.com"
     }; var a = sobject("Case").create([p],
     function(err, res) {
       if (err) { return console.error(err); }
       for (var i=0; i < res.length; i++) {
         if (res[i].success) {
           console.log("Created record id : " + res[i].id);
         }
       }
     }); return a; }).then(res => console.log(res.records));




conn.query("SELECT Id, Name FROM Account LIMIT 1")
  .then(function(res) {
    // receive resolved result from the promise,
    // then return another promise for continuing API execution.
    return conn.sobject('Account').create({ Name: 'Another Account' });
  })
SELECT Id FROM Account WHERE WebSite = 'www.example.com' (websites on accounts may be stored w/ http, https, etc, but the SF lookup will on take a 'www.example.com' as a string. regex to strip/add to the url as needed)

//all info needed to create a new case to upsert to sf
Type": "string",
  "Origin": "string",
  "Reason": "string",
  "Status": "string",
  "OwnerId": "string",
  "Subject": "string",
  "ParentId": "string",
  "Priority": "string",
  "AccountId": "required to create case under account",
  "ContactId": "string",
  "Description": "string",
  "IsEscalated": "boolean",
  "SuppliedName": "string",
  "SuppliedEmail": "string",
  "SuppliedPhone": "string",
  "SuppliedCompany": "string"

//conn function to return case id from url, set id on case info, and then upsert to sf

sobject("Case").create([
  {
     AccountId: x,
      Origin: "Web",
      Subject: "Test from CLI #1",
      Description: "This is a test from the CLI tool",
      SuppliedName: "David Lake",
      SuppliedEmail: "cli@cli.com"
     }
],
function(err, res) {
  if (err) { return console.error(err); }
  for (var i=0; i < res.length; i++) {
    if (res[i].success) {
      console.log("Created record id : " + res[i].id);
    }
  }
});

available case params for sf record:
"AccountId": "0014100000DOaXBAA1",
"Origin": "Web",
"Subject": "Test from CLI #1",
"Description": "This is a test from the CLI tool",
"SuppliedName": "David Lake",
"SuppliedEmail": "cli@cli.com"
