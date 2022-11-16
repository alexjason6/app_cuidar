class CEPService {
  async buscaCep(cep: string) {

    console.log(cep)
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json`, {
      method: 'GET',
    });

    return response.json();
  }
}

export default new CEPService();