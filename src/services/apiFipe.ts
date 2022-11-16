import axios from 'axios';

const buscarFIPE = axios.create({
  baseURL: 'https://parallelum.com.br/fipe/api/v1',
});

export default buscarFIPE;
