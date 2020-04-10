const BookController = require('./controllers/books');
const AuthController = require('./controllers/auth');
const AuthMiddleware = require('./middlewares/auth');

module.exports = (app) => {

  // Books
  
  app.get('/books', AuthMiddleware, (process.env.O_AUTH === 'true') ? app.oauth.authenticate() : (req, res, done) => done(), new BookController().index);

  // Auth
  
  if (process.env.JWT_AUTH === 'true') {
    app.post('/auth/login', new AuthController().login);
    app.post('/auth/register', new AuthController().register);
  }

  // OAuth

  if (process.env.O_AUTH === 'true') {
    app.post('/oauth/token', app.oauth.token());
  }
}