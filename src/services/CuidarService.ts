class CuidarService {
  async getDataAcess() {
    const response = await fetch('https://www.acuidar.com.br/app/dados-authorization.json');

    return response.json();
  }
}

export default new CuidarService();
