'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-byhdk2z6.us.auth0.com/.well-known/jwks.json'
  }),
  // This is the identifier we set when we created the API
  audience: 'https://clouday1-demo.com',
  issuer: 'https://dev-byhdk2z6.us.auth0.com/',
  algorithms: ['RS256']
});

app.get('/api/public-notes', (req, res) => {
  let notes = [
    { id: 1, note: 'Return library books', },
    { id: 2, note: 'Meditate', },
    { id: 3, note: 'Run backups', },
    { id: 4, note: 'Grocery shopping', }
  ];
  res.json(notes);
})

app.get('/api/private-notes', authCheck, (req,res) => {
  let notes = [
    { id: 4, note: 'Plan hiking trip', },
    { id: 5, note: 'Practice chess', },
    { id: 6, note: 'Practice pottery', },
  ];
  res.json(notes);
})

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

// const url = "https://3qgd653iwxosnngnisli7ybxrq0xqqgt.lambda-url.us-west-2.on.aws/?requestid="
// app.get(`${url}:id`, (req, res) => {
//   res.send(res.data);
// })

app.listen(8000);
console.log('Listening on localhost:8000');
