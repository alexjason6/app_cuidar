class FipeService {
  async buscaValor(path: string) {
    const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${path}`, {
      method: 'GET',
    });

    return response.json();
  }
}

export default new FipeService();
