const graph = require('@microsoft/microsoft-graph-client');
const db = require('./db');
const request = require('request');
const Q = require('q');
const config = require('./config');

const getAccessToken = function () {
  let deferred = Q.defer();

  let requestParams = {
    grant_type: 'client_credentials',
    client_id: process.env.AZURE_AD_CLIENT_ID,
    client_secret: process.env.AZURE_AD_CLIENT_SECRET,
    resource: 'https://graph.microsoft.com'
  }

  request.post({ url: 'https://login.microsoftonline.com/pkmgarciagmail.onmicrosoft.com/oauth2/token', form: requestParams }, function (err, response, body) {
    let parsedBody = JSON.parse(body);

    if(err) {
      deferred.reject(err);
    } else if (parsedBody.error) {
      deferred.reject(parsedBody.error_description);
    } else {
      deferred.resolve(parsedBody.access_token);
    }
  })
};

const user = {
  getMe: (accessToken) => {
    return new Promise((resolve, reject) => {
      console.log(`[getMe] Access Token Length: ${accessToken.length}`);

      const client = getAuthenticatedClient(accessToken.length);

      const user = client
        .api('/me')
        .get((err, res) => {
          if (err) {
            console.log(`[graph] getMe error: ${JSON.stringify(err)}`);
            reject(err);
          }
          else {
            console.log(`[graph] getMe found ${res.oid}`);
            resolve(res);
          }
        }
      );
    });
  },
  getMemberOf: (accessToken) => {
    return new Promise((resolve, reject) => {
      const client = getAuthenticatedClient(accessToken);
      
      const groups = client
        .api('/me/memberOf')
        .get((err, res) => {
          if (err) {
            console.log(`[graph] getMemberOf error: ${JSON.stringify(err)}`);
            reject(err);
          }
          else {
            console.log(`[graph] getMemberOf found ${res.value}`);
            resolve(res.value);
          }
        });
    });
  }
};

const superadmin = {
  createUser: (empNo) => {
    getAccessToken()
      .then((token) => {
        const client = getAuthenticatedClient(token);

        return client
                 .api('/users')
                 .post({
                   accountEnabled: true,
                   displayName: empNo,
                   mailNickname: empNo,
                   userPrincipalName: `${empNo}@pkmgarciagmail.onmicrosoft.com`,
                   passwordProfile: {
                     forceChangePasswordNextSignIn: true,
                     password: 'Thisishard375'
                   }
                 }, (err, res) => {
                   if (err) return err;
                   else {
                     db.addOIDToEmployee(res.id, empNo);
                     return res;
                   }
                 });
      });
  }
};

module.exports = {
  user,
  superadmin
};

function getAuthenticatedClient(accessToken) {
  const client = graph.Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    }
  });
  return client;
}

