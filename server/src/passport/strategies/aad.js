const {
  oidcConfig,
  bearerConfig
} = require('./config');
const db = require('../../db');

// OAuth
const oauth2 = require('simple-oauth2').create({
  client: {
    id: process.env.AZURE_AD_CLIENT_ID,
    secret: process.env.AZURE_AD_CLIENT_SECRET
  },
  auth: {
    tokenHost: 'https://login.microsoftonline.com/' + process.env.AZURE_AD_TENANT_NAME,
    authorizePath: '/oauth2/v2.0/authorize',
    tokenPath: '/oauth2/v2.0/token'
  }
});

// OIDC Strategy
const oidcCallback = (iss, sub, profile, accessToken, refreshToken, params, done) => {
  console.log('[OIDC callback]');
  // If user was not authenticated
  if (!profile.oid) {
    return done(new Error("No oid found"), null);
  }

  // Try to find user in database
  db.getEmployeeUsingOID(profile.oid)
    .then(employee => {
      if (employee) {
        // Create a token
        const oauth = oauth2.accessToken.create(params);

        // Update access token
        db.addOIDToEmployee(profile.oid, employee.empNo)
          .then(() => {
            db.addOAuthToEmployee(oauth.token, employee.empNo)
              .then(() => {
                employee.oid = profile.oid;
                employee.oauth = oauth;
                console.log(`[oidcCallback] Access token length: ${oauth.token.access_token.length}`);
                return done(null, employee);
              });
          });
      }
      else {
        return done(new Error("No employee found", null));
      }
    });
};

const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const oidcStrategy = new OIDCStrategy(oidcConfig, oidcCallback)

module.exports = {
  oidcStrategy
};

