const config = require('./config');
const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./passport');

const routes = require('./routes');
const app = express();

// Set up middleware
app.use(cors());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'super secret'
}));
// Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.use('/aad', routes.aad);
// mySQL
app.use('/mysql', routes.mysql);
// Twitter
app.use('/twitter', routes.twitter);

// Start listening

// Http
// http.createServer(PORT).listen(PORT);

// Https
const sslOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'test'
};
https.createServer(sslOptions, app).listen(process.env.SERVER_PORT, () => {
  console.log('Listening');
});
