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

var at = "";
var iu = "";

//session
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


//Test static assets
/*
app.get('/', function(req, res) {
     res.json([{
  	Id: 1,
  	Name: "You didn't get "
  }, {
  	Id: 2,
  	Name: "what you wanted"
  }]);
});
*/

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

        at = conn.accessToken;
        iu = conn.instanceUrl;

        /*
        console.log('Session Access Token: ' + req.session.accessToken);
        console.log('Session Instance URL: ' + req.session.instanceUrl);
        */
        res.redirect('/');
    });
});

app.get('/api/accounts', function(req, res) {

    // if auth has not been set, redirect to index
    /*placeholder
    if (!req.session.accessToken || !req.session.instanceUrl) { res.redirect('/'); }

    console.log(at);
    console.log(iu);
    var query = 'SELECT id, name FROM account LIMIT 10';

    var conn = new jsforce.Connection({
        oauth2 : {oauth2},
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl,
        refreshToken: req.session.refreshToken
   });

   conn.on("refresh", function(accessToken, res) {
  // Refresh event will be fired when renewed access token
  // to store it in your storage for next request
  });*/


   const records = [ { attributes:
     { type: 'Account',
       url: '/services/data/v39.0/sobjects/Account/0014100000D86Q6AAJ' },
    Id: '0014100000D86Q6AAJ',
    Name: 'Test1' },
  { attributes:
     { type: 'Account',
       url: '/services/data/v39.0/sobjects/Account/0014100000DEWfeAAH' },
    Id: '0014100000DEWfeAAH',
    Name: 'Edge Communications' },
  { attributes:
     { type: 'Account',
       url: '/services/data/v39.0/sobjects/Account/0014100000DEWffAAH' },
    Id: '0014100000DEWffAAH',
    Name: 'Burlington Textiles Corp of America' },
  { attributes:
     { type: 'Account',
       url: '/services/data/v39.0/sobjects/Account/0014100000DEWfgAAH' },
    Id: '0014100000DEWfgAAH',
    Name: 'Pyramid Construction Inc.' },
  { attributes:
     { type: 'Account',
       url: '/services/data/v39.0/sobjects/Account/0014100000DEWfhAAH' },
    Id: '0014100000DEWfhAAH',
    Name: 'Dickenson plc' },
  { attributes:
     { type: 'Account',
       url: '/services/data/v39.0/sobjects/Account/0014100000DEWfiAAH' },
    Id: '0014100000DEWfiAAH',
    Name: 'Grand Hotels & Resorts Ltd' },
  { attributes:
     { type: 'Account',
       url: '/services/data/v39.0/sobjects/Account/0014100000DEWfkAAH' },
    Id: '0014100000DEWfkAAH',
    Name: 'Express Logistics and Transport' },
  { attributes:
     { type: 'Account',
       url: '/services/data/v39.0/sobjects/Account/0014100000DEWflAAH' },
    Id: '0014100000DEWflAAH',
    Name: 'University of Arizona' },
  { attributes:
     { type: 'Account',
       url: '/services/data/v39.0/sobjects/Account/0014100000DEWfoAAH' },
    Id: '0014100000DEWfoAAH',
    Name: 'GenePoint' },
  { attributes:
     { type: 'Account',
       url: '/services/data/v39.0/sobjects/Account/0014100000DEWfmAAH' },
    Id: '0014100000DEWfmAAH',
    Name: 'United Oil & Gas, UK' } ];

   res.json(records);

      /*
   console.log("Connection details for accounts API call: Access Token - " + conn.accessToken + " | URL - " + conn.instanceUrl);

    conn.query(query, function(err, res) {
        if (err) {
            console.error("There was an error in the Accounts API call:" + err);
            res.redirect('/');
        }

        console.log(res.records);
        console.log('records returned');
        const recs = res.records;
        res.json(recs);
    }); */

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




/**
* Logout endpoint
*/

/*
server.get('/auth/logout', function(req, res) {
  var sesh = getSession(req, res);
  if (sesh == null)
    return;

  // Revoke OAuth token
  jsforce.auth.revoke({token: sesh.jsforceAuth.access_token}, function(error) {
    if (error) {
      console.error('Force.com OAuth revoke error: '+ JSON.stringify(error));
      res.status(500).json(error);
      return;
    }

    // Destroy server-side session
    sesh.destroy(function(error) {
      if (error)
        console.error('Force.com session destruction error: '+ JSON.stringify(error));
    });

    // Redirect to server main page
    return res.redirect('/index.html');
  });
});
*/

/**
* Endpoint for retrieving currently connected user
*/
/*
server.get('/auth/whoami', function(req, res) {
  var sesh = getSession(req, res);
  if (sesh == null)
    return;

  // req user info from Force.com API
  jsforce.data.getLoggedUser(sesh.jsforceAuth, function (error, userData) {
    if (error) {
      console.log('Force.com identity API error: '+ JSON.stringify(error));
      res.status(500).json(error);
      return;
    }
    // Return user data
    res.send(userData);
    return;
  });
});
*/

/**
* Endpoint for performing a SOQL query on Force.com
*/
/*
server.get('/query', function(req, res) {
  var sesh = getSession(req, res);
  if (sesh == null)
    return;

  if (!req.query.q) {
    res.status(400).send('Missing query parameter.');
    return;
  }

  const query = encodeURI(req.query.q);
  const apireqOptions = jsforce.data.createDatareq(sesh.jsforceAuth, 'query?q='+ query);

  httpClient.get(apireqOptions, function (error, payload) {
    if (error) {
      console.error('Force.com data API error: '+ JSON.stringify(error));
      res.status(500).json(error);
      return;
    }
    else {
      res.send(payload.body);
      return;
    }
  });
});
*/
