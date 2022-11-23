import HttpClientClubeCerto from './utils/httpClientClubeCerto';

class ClubeCertoService {

  httpCliente: HttpClientClubeCerto;

  constructor() {
    this.httpCliente = new HttpClientClubeCerto('https://www.clubecerto.com.br/ws/api');
  }

  async getData(path: string) {
    return this.httpCliente.get(path);
  }
}

export default new ClubeCertoService();
