import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://node-rewrite-api.herokuapp.com/api/',
})
