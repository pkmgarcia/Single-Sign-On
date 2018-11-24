const dotenv = require('dotenv').config();

var serverHost = '',
  serverPort = '',
  clientHost = '',
  clientPort = '';

const env = process.env.ENV;
switch (env) {
  case 'dev':
    serverHost = process.env.SERVER_HOST;
    serverPort = process.env.SERVER_PORT;
    clientHost = process.env.DEV_CLIENT_HOST;
    clientPort = process.env.DEV_CLIENT_PORT;
    break;
  case 'dev':
    serverHost = process.env.SERVER_HOST;
    serverPort = process.env.SERVER_PORT;
    clientHost = process.env.PROD_CLIENT_HOST;
    clientPort = process.env.PROD_CLIENT_PORT;
  default:
    console.log('[config.js] Environment not specified');
}

module.exports = {
  serverHost,
  serverPort,
  clientHost,
  clientPort
};

