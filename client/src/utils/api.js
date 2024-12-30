// /src/utils/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5001/api/test',  // Replace with your backend API
  timeout: 1000,
});
