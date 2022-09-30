import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://vine-backend.onrender.com/api',
  // baseURL: 'http://localhost:4000/api',
});

export default axiosClient;
