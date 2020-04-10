const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const applicationModel = require('../models/application');

module.exports = async function(req, res, next) {
  if (process.env.JWT_AUTH == 'true') {
    return jwtAuth(req, res, next);
  }

  if (process.env.API_KEY_AUTH == 'true') {
    return apiKeyAuth(req, res, next);
  }
  
  next();
}

async function jwtAuth(req, res, next) {
  if (!req.token) {
    return res.status(403).json({ error: 'No credentials provided' });
  }

  const token = req.token;

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }

  const connectedUser = await userModel.findOne({token: token}).lean(true);
 
  if (!connectedUser) {
    return res.status(403).json({ error: 'Token not found' });
  }

  next();
}

async function apiKeyAuth(req, res, next) {
  if (!req.headers["x-api-key"]) {
    return res.status(403).json({ error: 'No credentials provided' });
  }

  const apiKey = req.headers["x-api-key"];

  const connectedApp = await applicationModel.findOne({apiKey: apiKey}).lean(true);
 
  if (!connectedApp) {
    return res.status(403).json({ error: 'Token not found' });
  }

  next();
}