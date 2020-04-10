const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

module.exports = function(req, res, next) {
  return jwtAuth(req, res, next);
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
