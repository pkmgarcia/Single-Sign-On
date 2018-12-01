const graph = require('@microsoft/microsoft-graph-client');

const user = {
  getMe: (accessToken) => {
    return new Promise((resolve, reject) => {
      const client = getAuthenticatedClient(accessToken);

      const user = client
        .api('/me')
        .get((err, res) => {
          if (err) {
            console.log(`[graph] getMe error: ${JSON.stringify(err)}`);
            reject(err);
          }
          else {
            console.log(`[graph] getMe found ${res}`);
            resolve(res);
          }
        }
      );
    });
  }
};

const superadmin = {
  getUsers: (accessToken) => {
    const client = getAuthenticatedClient(accessToken);
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

