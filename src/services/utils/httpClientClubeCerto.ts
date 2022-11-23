class HttpClientClubeCerto {
  baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  get(path) {
    const method = 'GET';
    return this.makeRequest(path, method);
  };

  async makeRequest(path, method) {

    const response = await fetch(`${this.baseURL}${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        }
    });

    return response.json();
  }
}

export default HttpClientClubeCerto;
