// Set up Azure AD config
const serverHost = process.env.SERVER_HOST;
const serverPort = process.env.SERVER_PORT;
let clientHost = '';
let clientPort = '';

// Set host/ports based on root dotenv
switch (process.env.ENV) {
  case 'dev':
    clientHost = process.env.DEV_CLIENT_HOST;
    clientPort = process.env.DEV_CLIENT_PORT;
    break;
  case 'prod':
    clientHost = process.env.PROD_CLIENT_HOST;
    clientPort = process.env.PROD_CLIENT_PORT;
    break;
}

// Set up Azure AD credentials
const identityMetadata = 'https://login.microsoftonline.com/'
  + process.env.AZURE_AD_TENANT_NAME
  + '.onmicrosoft.com/.well-known/openid-configuration';
const aadCredentials = {
  identityMetadata,
  clientID: process.env.AZURE_AD_CLIENT_ID
};

// Set up Azure AD OIDC config
const oidcConfig = {
  identityMetadata,
  clientID: process.env.AZURE_AD_CLIENT_ID,
  responseType: 'code',
  responseMode: 'form_post',
  redirectUrl: 'https://localhost:3000/',
  allowHttpForRedirectUrl: false,
  clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
  validateIssuer: false,
  isB2C: false,
  issuer: null,
  passReqToCallback: false,
  scope: ['profile'],
  loggingLevel: 'info',
  nonceLifetime: null,
  nonceMaxAmount: 5,
  // useCookieInsteadOfSession: true,
  // cookieEncryptionKeys:
  clockSkew: null
};

// Set up Twitter config
const callbackURL = 'https://' + serverHost + ':' + serverPort + '/twitter/oauth/callback';
const twitterConfig = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL
};

module.exports = {
  aadCredentials,
  oidcConfig,
  twitterConfig
};

