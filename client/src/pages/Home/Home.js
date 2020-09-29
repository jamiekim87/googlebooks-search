import React, { useState } from 'react'

const Home = () => {

  const {mediaState, setMediaState} = useState({
    search: '',
    media: []
  })

  mediaState.handleInputChange = event => {
    setMediaState({ ...mediaState, [event.target.name]: event.target.value })
  }

  mediaState.handleSearchGoogle = event => {
    event.preventDefault()
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
            value={mediaState.search}
            onChange={mediaState.handleInputChange} />
      </p>
      <p>
        <button onClick={mediaState.handleSearchGoogle}>Search Google Books</button>
      </p>
    </form>
    </>
  )
}

export default Home