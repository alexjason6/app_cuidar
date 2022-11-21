class HttpClientHinova {
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

  put(path, options) {
    const method = 'PUT';
    return this.makeRequest(path, options, method);
  };

  async makeRequest(path, options, method) {
    const headers = new Headers ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${options.token}`
    });

    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.append(key, value);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: method,
      body: JSON.stringify(options.body),
      headers
    });

    return response.json();
  }
}

export default HttpClientHinova;
