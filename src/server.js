const express = require('express');
const basicAuth = require('express-basic-auth');
const bearerToken = require('express-bearer-token');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router');

mongoose.connect('mongodb://mongo:27017/base', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.use(bearerToken());
app.use(bodyParser.json());

let port = process.env.PORT || 3000;

if (process.env.BASIC_AUTH === 'true') {
  app.use(basicAuth({
    users: { 'admin': 'supersecret' }
  }));
}

router(app);

app.listen(port, () => console.log(`API Served off port: ${port}`));