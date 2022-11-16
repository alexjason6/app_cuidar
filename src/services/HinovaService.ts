class HinovaService {
  headers = {
    'Content-Type': 'application/json',
  };

  baseURL = 'https://api.hinova.com.br/api/sga/v2';

  async signIn(options: {body: { usuario: string, senha: string, token: string }}) {
    this.headers['Authorization'] = `Bearer ${options.body.token}`;

    const response = await fetch(`${this.baseURL}/usuario/autenticar`, {
      method: 'POST',
      body: JSON.stringify(options.body),
      headers: this.headers,
    });

    return response.json();
  }

  async getAssociados(data: {codigo_situacao: number, token: string}) {
    this.headers['Authorization'] = `Bearer ${data.token}`;

    const response = await fetch(`${this.baseURL}/listar/associado/`, {
      method: 'POST',
      body: JSON.stringify({codigo_situacao: data.codigo_situacao}),
      headers: this.headers
    });

    return response.json();
  }

  async getAssociado(data: {token: string, cpfCnpj: string}) {
    this.headers['Authorization'] = `Bearer ${data.token}`;

    const response = await fetch(`${this.baseURL}/associado/buscar/${data.cpfCnpj}`, {
      method: 'GET',
      headers: this.headers,
    });

    return response.json();
  }

  async updateAssociado(data: {token: string, body: {}}) {
    this.headers['Authorization'] = `Bearer ${data.token}`;

    const response = await fetch('https://api.hinova.com.br/api/sga/v2/alterar/associado', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data.body)
    });

    return response.json();
  }

  async getDataVencimento(data: {token: string, body: { cpf_associado: string, data_vencimento_original_inicial: string, data_vencimento_original_final: string }}) {
    this.headers['Authorization'] = `Bearer ${data.token}`;

    const response = await fetch(`${this.baseURL}/listar/boleto-associado-veiculo`, {
      method: 'POST',
      body: JSON.stringify(data.body),
      headers: this.headers
    });

    return response.json();
  }

  async getBoletos(data: {token: string, body:{}}) {
    this.headers['Authorization'] = `Bearer ${data.token}`;

    const response = await fetch('https://api.hinova.com.br/api/sga/v2/listar/boleto-associado-veiculo',{
      method: 'POST',
      body: JSON.stringify(data.body),
      headers: this.headers,
    });

    return response.json()
  }

  async getPdfBoleto(data: {token: string, nossoNumero: number}) {
    this.headers['Authorization'] = `Bearer ${data.token}`;

    const response = await fetch(`https://api.hinova.com.br/api/sga/v2/buscar/boleto/${data.nossoNumero}`, {
      method: 'GET',
      headers: this.headers,
    });

    return response.json();
  }

  async getVehicle(data: {token: string, placa: string}) {
    this.headers['Authorization'] = `Bearer ${data.token}`;

    const response = await fetch(`https://api.hinova.com.br/api/sga/v2/veiculo/buscar/${data.placa}`, {
      method: 'GET',
      headers: this.headers
    });

    return response.json();
  }

  async getProducts(data: {token: string, placa: string }) {
    this.headers['Authorization'] = `Bearer ${data.token}`;

    const response = await fetch(`https://api.hinova.com.br/api/sga/v2/produto-vinculado-veiculo/listar/${data.placa}`, {
      method: 'GET',
      headers: this.headers
    });

    return response.json();
  }

  async listProducts(data: {token: string}) {
    this.headers['Authorization'] = `Bearer ${data.token}`;

    const response = await fetch('https://api.hinova.com.br/api/sga/v2/grupoproduto/listar/ativo', {
      method: 'GET',
      headers: this.headers
    });

    return response.json();
  }
}

export default new HinovaService();