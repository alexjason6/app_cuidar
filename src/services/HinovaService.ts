import HttpClientHinova from './utils/httpClientHinova';

class HinovaService {
  httpClient: HttpClientHinova;

  constructor() {
    this.httpClient = new HttpClientHinova('https://api.hinova.com.br/api/sga/v2');
  }

  async signIn(data: { token: string, body: {usuario: string, senha: string} }) {
    return this.httpClient.post('/usuario/autenticar', {token: data.token, body: {usuario: data.body.usuario, senha: data.body.senha}});
  }

  async getAssociados(data: {codigo_situacao: number, token: string}) {
    return this.httpClient.post('/listar/associado/', {token: data.token, body: {codigo_situacao: data.codigo_situacao}});
  }

  async getAssociado(data: {token: string, cpfCnpj: string}) {
    return this.httpClient.get(`/associado/buscar/${data.cpfCnpj}`, {token: data.token});
  }

  async updateAssociado(data: {token: string, body: {}}) {
    return this.httpClient.post('/alterar/associado', {token: data.token, body: data.body});
  }

  async updateSituacaoAssociado(data: {token: string, situacao: number, codigo_associado: number}) {
    return this.httpClient.get(`/associado/alterar-situacao-para/${data.situacao}/${data.codigo_associado}`, {token: data.token});
  }

  async getDataVencimento(data: {token: string, body: { cpf_associado: string, data_vencimento_original_inicial: string, data_vencimento_original_final: string }}) {
    return this.httpClient.post('/listar/boleto-associado-veiculo', {token: data.token, body: data.body});
  }

  async getBoletos(data: {token: string, body:{}}) {
    return this.httpClient.post('/listar/boleto-associado-veiculo', {token: data.token, body: data.body});
  }

  async getPdfBoleto(data: {token: string, nossoNumero: number}) {
    return this.httpClient.get(`/buscar/boleto/${data.nossoNumero}`, {token: data.token});
  }

  async getVehicle(data: {token: string, placa: string}) {
    return this.httpClient.get(`/veiculo/buscar/${data.placa}`, {token: data.token});
  }

  async updateSituacaoVehicle(data: {token: string, situacao: number, codigo_veiculo: number}) {
    return this.httpClient.get(`/veiculo/alterar-situacao-para/${data.situacao}/${data.codigo_veiculo}`, {token: data.token});
  }

  async getProducts(data: {token: string, placa: string }) {
    return this.httpClient.get(`/produto-vinculado-veiculo/listar/${data.placa}`, {token: data.token});
  }

  async listProducts(data: {token: string}) {
    return this.httpClient.get('/grupoproduto/listar/ativo', {token: data.token});
  }
}

export default new HinovaService();
