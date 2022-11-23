import React from 'react';
import {
  SafeAreaView,
  Linking,
} from 'react-native';

import FechaModal from  '../../../../components/FechaModal';
import {Button} from '../../../../components/Button';

import { Container, Content, Text, View, Image } from './styles';

export default function ModalDesconto({visible, dadosEstabelecimento}) {

  console.log(dadosEstabelecimento)

  return (
    <Container visible={visible} animationType='slide' presentationStyle='formSheet'>
      <SafeAreaView>
        <Content>
          <FechaModal />
          <Image source={{uri:dadosEstabelecimento.Marca}} />
          <Text titleEstabelecimento>{dadosEstabelecimento.Nome}</Text>

          {dadosEstabelecimento.Beneficios.map((desconto, index) => (
            <View key={index}>
              <Text descricaoEstabelecimento>{desconto.desconto}</Text>
              <Text regrasEstabelecimento>Regra: {desconto.regra}</Text>
            </View>
          ))}

            {dadosEstabelecimento.Linksite &&
              <Button desconto onPress={() => Linking.openURL(dadosEstabelecimento.Linksite)}>
                <Text btnDesconto>{dadosEstabelecimento.Linkdescricao}</Text>
              </Button>
            }
            <Text regrasEstabelecimento>Regras: {dadosEstabelecimento.Regras.replaceAll('<br/>','')}</Text>

           {dadosEstabelecimento?.Enderecos.length !== 0 && <Text titleEnderecos>Endereços:</Text>}

            {dadosEstabelecimento?.Enderecos.length !== 0 && (dadosEstabelecimento.Enderecos.map((item, index) => (
              <View key={index}>
                <Text titleDetalheDescontos>{item.titulo}</Text>
                <Text dadosDetalheDesconto>{item.endereco} - {item.CidadeNome}</Text>
              </View>
            )))}
        </Content>
      </SafeAreaView>
    </Container>
  )
}
