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

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set up middleware
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'super secret',
  unset: 'destroy'
}));
// Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.use('/graph', routes.graph);
app.use('/aad', routes.aad);
app.use('/mysql', passport.authenticate('azuread-openidconnect', routes.mysql));
app.use('/twitter', routes.twitter);
// Google+
app.use('/google', routes.googlePlus);

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
