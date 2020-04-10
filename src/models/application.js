const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  apiKey: String,
  clientId: String,
  clientSecret: String,
  redirectUris: Array,
  grants: Array,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Application', applicationSchema);