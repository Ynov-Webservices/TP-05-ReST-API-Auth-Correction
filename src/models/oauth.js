const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.model('OAuthTokens', new Schema({
  accessToken: { type: String },
  accessTokenExpiresAt: { type: Date },
  client : { type: Object },
  clientId: { type: String },
  refreshToken: { type: String },
  refreshTokenExpiresAt: { type: Date },
  user : { type: Object },
  userId: { type: String },
}));

mongoose.model('OAuthUsers', new Schema({
  email: { type: String, default: '' },
  firstname: { type: String },
  lastname: { type: String },
  password: { type: String },
  username: { type: String }
}));

var OAuthTokensModel = mongoose.model('OAuthTokens');
var ApplicationModel = mongoose.model('Application');
var UserModel = mongoose.model('User');

module.exports.getAccessToken = function(bearerToken) {
  return OAuthTokensModel.findOne({ accessToken: bearerToken }).lean();
};

module.exports.getClient = function(clientId, clientSecret) {
  return ApplicationModel.findOne({ clientId: clientId, clientSecret: clientSecret }).lean();
};

module.exports.getRefreshToken = function(refreshToken) {
  return OAuthTokensModel.findOne({ refreshToken: refreshToken }).lean();
};

module.exports.getUser = function(username, password) {};

module.exports.getUserFromClient = function(client){
  return UserModel.findById(client.user);
}

module.exports.saveAuthorizationCode = function(){
  console.log('how is this implemented!?', arguments);
}

module.exports.saveToken = function(token, client, user) {
  var accessToken = new OAuthTokensModel({
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    client : client,
    clientId: client.clientId,
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    user : user,
    userId: user._id,
  });
  return new Promise( function(resolve,reject){
    accessToken.save(function(err,data){
      if( err ) reject( err );
      else resolve( data );
    }) ;
  }).then(function(saveResult){
    saveResult = saveResult && typeof saveResult == 'object' ? saveResult.toJSON() : saveResult;
    
    var data = new Object();
    for( var prop in saveResult ) data[prop] = saveResult[prop];
    
    data.client = data.clientId;
    data.user = data.userId;

    return data;
  });
};