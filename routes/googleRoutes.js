const router = require('express').Router()
const axios = require('axios')
const { Book } = require('../models')

router.get('/google/:search', (req, res) => {
  console.log('here')
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.search}`)
  .then(({ data }) => data.items.map(book => ({
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors.join(", "),
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail,
      link: book.volumeInfo.infoLink,
      googleID: book.id
    })))
    .then(apiBook => Book.find()
      .then(book => apiBook.filter(data =>
        book.every(dbData => dbData.googleID !== data.googleID))))
    .then(book => res.json(book))
    .catch(err => console.log(err))
})

module.exports = router