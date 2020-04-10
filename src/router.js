const BookController = require('./controllers/books');
const AuthController = require('./controllers/auth');
const AuthMiddleware = require('./middlewares/auth');

module.exports = (app) => {

  // Books
  
  app.get('/books', AuthMiddleware, new BookController().index);

  // Auth
  
  app.post('/auth/login', new AuthController().login);
  app.post('/auth/register', new AuthController().register);
}