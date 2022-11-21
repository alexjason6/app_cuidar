class HttpClientSmart {
  baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  post(path, options) {
    const method = 'POST';
    return this.makeRequest(path, options, method);
  };

  get(path, options) {
    const method = 'GET';
    return this.makeRequest(path, options, method);
  };

  async makeRequest(path, options, method) {
    const headers = options?.header;

    const response = await fetch(`${this.baseURL}${path}`, {
      method: method,
      body: options?.body,
      headers
    });

    if (options === 'getAddress') {
      return response.text();
    }

    return response.json();
  }
}

export default HttpClientSmart;
