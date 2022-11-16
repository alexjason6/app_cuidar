import axios from 'axios';

const buscarPLACA = axios.create({
  baseURL: 'https://apicarros.com/v1/consulta',
});

export default buscarPLACA;
