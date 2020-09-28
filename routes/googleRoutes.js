const router = require('express').Router()
const axios = require('axios')
const { Book } = require('../models')

router.get('/google/:search', (req, res) => {
  axios.get(`https://www.googleapis.com/auth/books/?apikey=trilogy&s=${bookstate}`)
    .then(({ data }) => data.Search.map(book => ({
      title: book.Title,
      authors: book.Authors,
      description: book.Description,
      image: book.Image,
      link: book.Link
    })))
    .then(apiBook => Book.find()
      .then(book => apiBook.filter(data =>
        book.every(dbData => dbData.googleID !== data.googleID))))
    .then(book => res.json(book))
    .catch(err => console.log(err))
})

module.exports = router