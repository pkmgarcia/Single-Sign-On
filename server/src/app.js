const config = require('./config');
const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./passport');

const routes = require('./routes');
const app = express();

// React
app.use('/Single-Sign-On', express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Set up middleware
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'super secret'
}));
// Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
// Auth
app.use('/auth', routes.auth);
// The rest of the React app
app.use('/Single-Sign-On/', passport.authenticate('local', { failureRedirect: 'login' });
// AAD
app.use('/auth/aad', routes.aad);
// mySQL
app.use('/auth/mysql', routes.mysql);
// Twitter
app.use('/auth/twitter', routes.twitter);

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
