import firestore from '@react-native-firebase/firestore';

export default async function sendEmail({setor, mensagem, user, dadosVeiculo}) {
  const date = new Date();

  await firestore()
  .collection('mail')
  .doc(`${user.nome} - ${date}`)
  .set({
    to: 'falecom@acuidar.com.br',
    message: {
      subject: 'Fale conosco - APP Cuidar',
      text: 'Mensagem enviada pelo APP',
      html: `Mensagem enviada pelo associado via <code><b>aplicativo CUIDAR</b></code>:<code><br />Associado: <b>${user.nome}</b><br />Telefone: <b>${user.telefone_celular}</b><br />e-mail: <b>${user.email}</b><br />CPF: <b>${user.cpf}</b><br />Placa veículo: <b>${dadosVeiculo.placa}</b><br />Setor: <b>${setor}</b><br />Mensagem do associado: <b>${mensagem}</b></code>`,
    },
  });

}