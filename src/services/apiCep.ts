import axios from 'axios';

const buscarCEP = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

export default buscarCEP;
