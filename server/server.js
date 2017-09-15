// server/server.js
const httpClient = require('request');
const express = require('express');
const jsforce = require('jsforce');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const config = require('./config');
const bodyParser = require('body-parser');

// Setup HTTP server
const app = express();


//initialize session
app.use(session({secret: 'S3CRE7', resave: true, saveUninitialized: true}));

//bodyParser
app.use(bodyParser.json());

//jsForce connection
const oauth2 = new jsforce.OAuth2({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl : 'https://bspoke-dev-ed.my.salesforce.com',
    clientId : '3MVG9szVa2RxsqBZjh_k.RvJXDUONto6617zQuwcaGLwh_E8jSnT2Vw8u1Trf3.gqNNP44UmnGDdDDtSQDhGs',
    clientSecret : '73500702797681914',
    //redirectUri : 'http://localhost:' + port +'/token'
    redirectUri : 'http://localhost:3030/token'
});

// Serve static assets
app.use(express.static(path.join(__dirname, '../build')));

/**
* Login endpoint
*/
app.get("/auth/login", function(req, res) {
  // Redirect to Salesforce login/authorization page
  res.redirect(oauth2.getAuthorizationUrl({scope: 'api id web refresh_token'}));
});

/**
* Login callback endpoint (only called by Force.com)
*/
app.get('/token', function(req, res) {

    const conn = new jsforce.Connection({oauth2: oauth2});
    const code = req.query.code;
    conn.authorize(code, function(err, userInfo) {
        if (err) { return console.error("This error is in the auth callback: " + err); }

        console.log('Access Token: ' + conn.accessToken);
        console.log('Instance URL: ' + conn.instanceUrl);
        console.log('refreshToken: ' + conn.refreshToken);
        console.log('User ID: ' + userInfo.id);
        console.log('Org ID: ' + userInfo.organizationId);

        req.session.accessToken = conn.accessToken;
        req.session.instanceUrl = conn.instanceUrl;
        req.session.refreshToken = conn.refreshToken;

        res.redirect('/');
    });
});

app.get('/api/accounts', function(req, res) {

    // if auth has not been set, redirect to index

    if (!req.session.accessToken || !req.session.instanceUrl) { res.redirect('/'); }

    var query = 'SELECT id, name FROM account LIMIT 10';

    var conn = new jsforce.Connection({
        oauth2 : {oauth2},
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
   });

   console.log("Connection details for accounts API call: Access Token - " + conn.accessToken + " | URL - " + conn.instanceUrl);

    var records = [];
    var query = conn.query(query)
       .on("record", function(record) {
         records.push(record);
       })
       .on("end", function() {
         console.log("total in database : " + query.totalSize);
         console.log("total fetched : " + query.totalFetched);
         res.json(records);
       })
       .on("error", function(err) {
         console.error(err);
       })
       .run({ autoFetch : true, maxFetch : 4000 });
});

app.get("/auth/logged-out", function(req, res) {
  // Redirect to Salesforce login/authorization page
  res.send('Please try again: <a href="/">Home</a>');
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

module.exports = app;
