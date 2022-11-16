import firestore from '@react-native-firebase/firestore';

export default async function sendIndicacao(accessData: {user: {nome: string, telefone_celular: string, telefone_fixo: string, cpf: string, veiculos: {}}, nomeAmigo: string, telefoneAmigo: string}) {
  const date = new Date();
  
  await firestore()
  .collection('indicacao')
  .doc(`${accessData.user.nome} - ${date}`)
  .set({
    to: 'falecom@acuidar.com.br',
    message: {
      subject: 'Indicação - APP Cuidar',
      text: 'Indicação enviada pelo APP',
      html: `Mensagem enviada pelo associado via <code><b>aplicativo CUIDAR</b></code>:<code><br />Associado: <b>${accessData.user.nome}</b><br />Telefone: <b>${accessData.user.telefone_fixo}</b>/<b>${accessData.user.telefone_celular}</b><br />CPF: <b>${accessData.user.cpf}</b><br />Placa veículo: <b>${accessData.user.veiculos.placa}</b><br />Nome amigo indicado: <b>${accessData.nomeAmigo}</b><br />Telefone do amigo indicado: <b>${accessData.telefoneAmigo}</b></code>`,
    },
  });
}