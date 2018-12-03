// Set up Azure AD config
let serverHost = process.env.PROD_SERVER_HOST;
const serverPort = process.env.SERVER_PORT;
let clientHost = '';
let clientPort = '';

// Set host/ports based on root dotenv
switch (process.env.ENV) {
  case 'dev':
    serverHost = process.env.DEV_SERVER_HOST;
    clientHost = process.env.DEV_CLIENT_HOST;
    clientPort = process.env.DEV_CLIENT_PORT;
    break;
  case 'prod':
    serverHost = process.env.PROD_SERVER_HOST;
    clientHost = process.env.PROD_CLIENT_HOST;
    clientPort = process.env.PROD_CLIENT_PORT;
    break;
}

// Set up Azure AD credentials
/*
const identityMetadata = 'https://login.microsoftonline.com/'
  + process.env.AZURE_AD_TENANT_NAME
  + '.onmicrosoft.com/.well-known/openid-configuration';
*/
const identityMetadata = 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration';
const aadCredentials = {
  identityMetadata,
  clientID: process.env.AZURE_AD_CLIENT_ID
};

const config = {
  ...aadCredentials,
  validateIssuer: false,
  issuer: null,
  scope: ['profile'],
  clockSkew: null,
  loggingLevel: 'error',
  resourceURL: 'https://graph.microsoft.net'
}

const bearerConfig = {
  ...config,
  passReqToCallback: true,
  audience: 'https://graph.microsoft.net'
};

// Set up Azure AD OIDC config
const oidcConfig = {
  ...config,
  passReqToCallback: false,
  responseType: 'code id_token',
  responseMode: 'form_post',
  redirectUrl: 'https://' + serverHost + ':' + serverPort + '/aad/auth/openid/callback',
  allowHttpForRedirectUrl: false,
  clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
  nonceLifetime: null,
  nonceMaxAmount: 5,
  // useCookieInsteadOfSession: true,
  // cookieEncryptionKeys:
};

// Set up Twitter config
const callbackURL = 'https://' + serverHost + ':' + serverPort + '/twitter/oauth/callback';
const twitterConfig = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL
};

// Set up Google Plus config
const callbackURLGoogle = 'https://' + serverHost + ':' + serverPort + '/auth/google/redirect';
const googlePlusConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURLGoogle
};

module.exports = {
  bearerConfig,
  oidcConfig,
  twitterConfig,
  googlePlusConfig
};

