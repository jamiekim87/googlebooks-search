import React, { useState } from 'react'
import { getBook } from '../../utils/API'

const Home = () => {

  const {bookState, setBookState} = useState({
    search: '',
    book: []
  })

  bookState.handleInputChange = event => {
    setBookState({ ...bookState, [event.target.name]: event.target.value })
  }

  bookState.handleSearchGoogle = event => {
    event.preventDefault()
    getBook(bookState.search)
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => console.error(err))
  }

  return (
    <>
    <h1>Search for Google Books</h1>
    <form>
      <p>
        <label htmlFor="search">search</label>
        <input 
            type="text" 
            name="search"
            value={bookState.search}
            onChange={bookState.handleInputChange} />
      </p>
      <p>
        <button onClick={bookState.handleSearchGoogle}>Search Google Books</button>
      </p>
    </form>
    </>
  )
}

export default Home