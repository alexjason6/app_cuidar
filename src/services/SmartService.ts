import HttpClientSmart from './utils/httpClientSmart';

class SmartService {
  httpClient: HttpClientSmart;

  constructor() {
    this.httpClient = new HttpClientSmart('https://web.smartgps.com.br');
  }

  async signIn(login: string) {
    const data = new FormData();
    data.append('email', login);
    data.append('password', '123456');

    return this.httpClient.post('/api/login', {headers: {'Content-Type': 'multipart/form-data'}, body: data});
  }

  async getDevice(token: string) {
    return this.httpClient.get(`/api/get_devices?user_api_hash=${token}`, {});
  }

  async getHistory(accessData: {token: string, id: string, dataSelected: string}) {
    return this.httpClient.get(`/api/get_history/?lang=en&user_api_hash=${accessData.token}&device_id=${accessData.id}&from_date=${accessData.dataSelected}&from_time=00%3A00&to_date=${accessData.dataSelected}&to_time=23%3A59`, {});
  }

  async getAddress(accessData: {latitude: number, longitude: number}) {
    return this.httpClient.get(`/geo_address?lat=${accessData.latitude}&lon=${accessData.longitude}`,  'getAddress');
  }
}

export default new SmartService();
