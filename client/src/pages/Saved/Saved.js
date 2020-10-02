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

        console.log(data)
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
              <h3>{book.title}</h3>
              <h4>Authors: {book.authors}</h4>
              <h4>Description: {book.description}</h4>
              <h5>Link: {book.link}</h5>
              <button onClick={() => savedState.handleDeleteSaved(book._id)}>Delete</button>
            </div>
          ))
        ) : null
      }
    </>
  )
}

export default Saved