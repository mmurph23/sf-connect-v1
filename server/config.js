
const config = {
// Salesforce client settings for Force.com connection
     'jsforce' : {
    // OAuth2 service
    // OAuth authentication domain
    // For production or DE use
    loginUrl : 'https://bspoke-dev-ed.my.salesforce.com',
    // For sandbox use
    //domain : 'https://test.salesforce.com',

    // URL called by Force.com after authorization and used to extract an authorization code.
    // This should point to your app and match the value configured in your App in SFDC setup)
    redirectUri : 'http://localhost:3000/auth/callback',

    // Set of secret keys that allow your app to authenticate with Force.com
    // These values are retrieved from your App configuration in SFDC setup.
    // NEVER share them with a client.
    clientId : '3MVG9szVa2RxsqBZjh_k.RvJXDUONto6617zQuwcaGLwh_E8jSnT2Vw8u1Trf3.gqNNP44UmnGDdDDtSQDhGs',
    clientSecret : '73500702797681914',
     },
  // Data service




// Express server configuration
  'server' : {
       // Server HTTP port
       port : 3000,

       // Whether the server is configured with HTTPS
       isHttps : false,

       // Secret key used to encrypt user sessions
       sessionSecretKey : 'mySecretK3y!'
   }

}


module.exports = config;
