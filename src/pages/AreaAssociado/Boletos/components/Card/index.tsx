import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';

import {Container, CopyView, DateView, Text} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFI from 'react-native-vector-icons/Feather';

export default function Card({children, linhaDigitavel, valor, status, tipo, placas, vencimento, index}) {
  
  function copyToClipboard() {
    const copy = linhaDigitavel;
    Clipboard.setString(copy);
    Alert.alert('Tudo certo!', 'Código de barras copiado com sucesso.');
  }

  return (
    <Container key={index}>
      <Text title>{status}</Text>
      <Icon name={status === 'AGUARDANDO PAGAMENTO' ? 'barcode' : status === 'BOLETO PAGO' ? 'check' : 'exclamation-triangle'} size={30} color={status === 'AGUARDANDO PAGAMENTO' ? '#999999' : status === 'BOLETO PAGO' ? '#40C351' : '#e60000'} />
      <CopyView>
        <Text barCode>{linhaDigitavel}</Text>
        {status === ('AGUARDANDO PAGAMENTO' || 'BOLETO ATRASADO') && <TouchableOpacity onPress={copyToClipboard}><IconFI name={'copy'} size={30} color={'#0c71c3'} /></TouchableOpacity>}
      </CopyView>
      <Text valor>
        {Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(valor)}
      </Text>
      <DateView>
        <Icon name={'calendar'} size={15} color={'#e60000'} />
        <Text vencimento>Vencimento em: {moment(vencimento).format('DD/MM/YYYY')}</Text>
      </DateView>
      <Text tipo>{tipo}</Text>
      {placas.map((placa: {codigo_veiculo: number, placa: string}) => (
        <Text placas key={placa.codigo_veiculo}>{placa.placa}</Text>
      ))}
      {children}
    </Container>
  )
}
