import React, { useState } from 'react'
import MediaContext from '../../utils/MediaContext'
import Typography from '@material-ui/core/Typography'
import Form from '../../components/Form'
import Media from '../../components/Media'
import API from '../../utils/API'

const Home = () => {

  const [bookState, setBookState] = useState({
    search: '',
    book: []
  })

  bookState.handleInputChange = event => {
    setBookState({ ...bookState, [event.target.name]: event.target.value })
  }

  bookState.handleSearchGoogle = event => {
    event.preventDefault()
    API.getBook(bookState.search)
      .then(({ data }) => {
        setBookState({ ...bookState, book: data, search: '' })
      })
      .catch(err => console.error(err))
  }

  bookState.handleSaveBook = googleID => {
    const saveBook = bookState.media.filter(x => x.googleID === googleID)[0]
    API.saveBook(saveBook)
      .then(() => {
        const book = bookState.book.filter(x => x.googleID !== googleID)
        setBookState({ ...bookState, book })
      })
  }

  return (
    <>
      <hr />
      <Typography variant="h6">
        Search for Google Books
      </Typography>
      <BookContext.Provider value={bookState}>
      <Form />
      {
        bookState.book.length > 0 ? (
          bookState.book.map(book => (
            <book
              key={book.googleID}
              book={book}
              handleSaveBook={bookState.handleSaveBook} />
          ))
        ) : null
      }
      </BookContext.Provider>
    </>
  )
}

export default Home