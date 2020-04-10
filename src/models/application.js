const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  api_key: String
});

module.exports = mongoose.model('Application', applicationSchema);