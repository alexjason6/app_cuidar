import React from "react";
import Icon from 'react-native-vector-icons/Feather';

import Header from "../../../../../components/Header";

import { Container, View } from './styles';

export default function Error() {

  return (
    <Container>
      <Header title={'Tudo certo por aqui.'} description={`Aparentemente você fez sua adesão recentemente e ainda não tem nenhum boleto emitido pelo nosso sistema.${'\n'}${'\n'}${'\n'}Aguarde o   fechamento mensal para que seus boletos comecem a ser listados e disponibilizados aqui no APP.`} children={undefined} closeButton={undefined} modalBoleto={undefined} />
      <View>
        <Icon name={'alert-triangle'} size={120} color={'#cccccc'} />
      </View>
    </Container> 
  )
}
