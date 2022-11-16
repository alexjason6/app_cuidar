import axios from 'axios';

const apiHinova = axios.create({
  baseURL: 'https://api.hinova.com.br/api/sga/v2',
});

export default apiHinova;
