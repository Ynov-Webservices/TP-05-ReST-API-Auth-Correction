const BookController = require('./controllers/books');
const AuthMiddleware = require('./middlewares/auth');

module.exports = (app) => {

  // Books
  
  app.get('/books', AuthMiddleware, new BookController().index);
}