class SmartService {

  baseURL = 'https://web.smartgps.com.br';

  async signInEmail(email: string) {

    const data = new FormData();
    data.append('email', email);
    data.append('password', '123456');

    const response = await fetch(`${this.baseURL}/api/login`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return response.json();
  }

  async signInCpf(cpf: string) {

    const data = new FormData();
    data.append('email', cpf);
    data.append('password', '123456');

    const response = await fetch(`${this.baseURL}/api/login`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return response.json();
  }

  async getDevice(token: string) {
    const response = await fetch(`${this.baseURL}/api/get_devices?user_api_hash=${token}`, {
      method: 'GET',
    });
    return response.json();
  }

  async getHistory(accessData: {token: string, id: string, dataSelected: string}) {
    const response = await fetch(`${this.baseURL}/api/get_history/?lang=en&user_api_hash=${accessData.token}&device_id=${accessData.id}&from_date=${accessData.dataSelected}&from_time=00%3A00&to_date=${accessData.dataSelected}&to_time=23%3A59`, {
      method: 'GET',
    });

    return response.json();
  }

  async getAddress(accessData: {latitude: number, longitude: number}) {
    const response = await fetch(`${this.baseURL}/geo_address?lat=${accessData.latitude}&lon=${accessData.longitude}`, {
      method: 'GET',
    });

    return response.text();
  }

  async sendEngineCommand(accessData: {token: string}) {
    const response = await fetch(`${this.baseURL}/api/send_command_data/?lang=en&user_api_hash=${accessData.token}`);

    return response.json();
  }
}

export default new SmartService();
