const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class AuthController {

  // POST /auth/login
  async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await userModel.findOne({email: email});
    
    const correctPassword = await bcrypt.compare(password, existingUser.password);

    if (!existingUser || !correctPassword) {
      return res.status(400).json({ error: 'Bad credentials' });
    }

    existingUser.token = jwt.sign({email: existingUser.email}, process.env.JWT_SECRET);
    existingUser.save();

    res.json({
      access_token: existingUser.token
    });
  }

  // POST /auth/register
  async register(req, res) {
    const email = req.body.email;
    let password = req.body.password;

    const existingUser = await userModel.findOne({email: email});

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    password = await bcrypt.hash(password, 10);

    let newUser = await new userModel({email: email, password: password}).save();
    
    res.json({
      _id: newUser._id
    });
  }
}