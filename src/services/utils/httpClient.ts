class HttpClient {
  baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  post(path: string, options: { body: {usuario: string, senha: string, token: string}, method: 'POST' }) {
    return this.makeRequest(path, options);
  };

  async makeRequest(path: string, options: { body: { usuario: string, senha: string, token: string}, method: string}) { 
    const headers = new Headers({
      'Authorization': `Bearer ${options.body.token}`,
      'Content-Type': 'application/json',
    });

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers
    });

    return response.json();
  }
}

export default HttpClient;