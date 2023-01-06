import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';

export default async function sendAssociadoData(accessData: {boleto: {data_vencimento: string}, user: {cpf: string}}) {
  const fcmToken = await messaging().getToken();
  await firestore()
  .collection('associados')
  .doc(accessData.user.cpf)
  .set({
    data_atualizacao: new Date(),
    ...accessData.user,
    _dataVencimentoBoletos: accessData.boleto.data_vencimento.slice(8, 10),
    token_messaging: fcmToken
  });
}
