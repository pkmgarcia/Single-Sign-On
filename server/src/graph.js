const graph = require('@microsoft/microsoft-graph-client');

const user = {
  getMe: (accessToken) => {
    const client = getAuthenticatedClient(accessToken);

    const user = client.api('/me').get();
    return user;
  }
};

const superadmin = {
  getUsers: (accessToken) => {
    const client = getAuthenticated
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
}

