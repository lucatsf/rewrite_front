import axios from 'axios'
import 'dotenv/config';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})
