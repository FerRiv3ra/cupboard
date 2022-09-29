import axios from 'axios';

const axiosClient = axios.create({
  // TODO: Cambiar la dirección de backend antes de deploy
  // baseURL: 'https://grubhubbackend.herokuapp.com/api',
  // baseURL: 'https://vine-backend.onrender.com/api',
  baseURL: 'http://localhost:4000/api',
});

export default axiosClient;
