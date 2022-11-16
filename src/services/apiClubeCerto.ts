import axios from 'axios';

const buscarClubeCerto = axios.create({
  baseURL: 'https://www.clubecerto.com.br/ws/api/',
});

export default buscarClubeCerto;
