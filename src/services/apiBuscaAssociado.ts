import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
const buscaAssociado = axios.create({
  baseURL: 'https://api.hinova.com.br/api/sga/v2',
});

export default buscaAssociado;
