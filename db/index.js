module.exports = require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/book_db', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
})
