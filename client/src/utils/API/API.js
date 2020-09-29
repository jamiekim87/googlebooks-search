import axios from 'axios'

const API = {
  getBook: search => axios.get(`/api/google/${search}`),
  getSavedBook: () => axios.get('/api/book'),
  saveBook: book => axios.post('/api/book', book),
  deletebook: id => axios.delete(`/api/book/${id}`)
}

export default API