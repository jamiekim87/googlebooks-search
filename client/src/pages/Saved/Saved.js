import React, { useState, useEffect } from 'react'
import API from '../../utils/API'

const Saved = () => {

  const [savedState, setSavedState] = useState({
    saved: []
  })

  savedState.handleDeleteSaved = id => {
    API.deleteBook(id)
      .then(() => {
        let saved = savedState.saved.filter(book => book._id !== id)
        setSavedState({ ...savedState, saved })
      })
  }

  useEffect(() => {
    API.getSavedBook()
      .then(({ data }) => {
        setSavedState({ ...savedState, saved: data })
      })
  }, [])

  return (
    <>
    <h1>Your saved Google Books</h1>
      {
        savedState.saved.length > 0 ? (
          savedState.saved.map(book => (
            <div key={book.googleID}>
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <h4>Type: {book.type}</h4>
              <h4>Year: {book.year}</h4>
              <h5>googleID: {book.googleID}</h5>
              <button onClick={() => savedState.handleDeleteSaved(book._id)}>Delete</button>
            </div>
          ))
        ) : null
      }
    </>
  )
}

export default Saved