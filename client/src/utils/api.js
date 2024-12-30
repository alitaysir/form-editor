// /src/utils/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://form-editor-ssql.onrender.com/api/test',  // Replace with your backend API
  timeout: 1000,
});
