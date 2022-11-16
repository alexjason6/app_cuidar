import axios from 'axios';

const apiSmart = axios.create({
  baseURL: 'https://web.smartgps.com.br/api',
});

export default apiSmart;
