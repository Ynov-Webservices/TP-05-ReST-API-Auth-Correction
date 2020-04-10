const express = require('express');
const basicAuth = require('express-basic-auth');
const router = require('./router');

const app = express();
let port = process.env.PORT || 3000;

if (process.env.BASIC_AUTH) {
  app.use(basicAuth({
    users: { 'admin': 'supersecret' }
  }));
}

router(app);

app.listen(port, () => console.log(`API Served off port: ${port}`));