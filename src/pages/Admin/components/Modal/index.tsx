import React from 'react';
import { Share } from 'react-native';
import { WebView } from 'react-native-webview';

import FechaModal from '../../../../components/FechaModal';
import { Button } from '../../../../components/Button';

import {Container, View, Text} from './styles';

export default function ModalBoletos({visible, linkBoleto}) {

  async function compartilha() {
    await Share.share({
     message: 'Boleto CUIDAR.',
     url: linkBoleto,
    });
  }

  return (
    <Container visible={visible} animationType={'slide'} presentationStyle={'pageSheet'}>
      <View header>
        <FechaModal />
      </View>
      <WebView allowFileAccessFromFileURLs source={{uri:linkBoleto}} style={{width: '100%'}}/>
      <Button shareBoleto onPress={compartilha}>
        <Text>Compartilhar PDF</Text>
      </Button>
      </Container>
  )
}
