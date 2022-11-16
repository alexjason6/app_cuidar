import React, { useContext, useState } from "react";
import { Modal, Share } from "react-native";
import { WebView } from 'react-native-webview';
import Icon from "react-native-vector-icons/Feather";

import ModalContext from '../../../../../contexts/modalContext';

import {Button} from '../../../../../components/Button';
import Header from '../../../../../components/Header';
import Loading from '../../../../../components/Loading';

import {Container, Content} from './styles';
import CloseModal from "../../../../../components/FechaModal";

export default function ModalBoletos({linkBoleto}) {
  const {modal} = useContext(ModalContext);

  async function compartilha() {
    await Share.share({
     message: `Boleto CUIDAR - ${linkBoleto}`,
     url: linkBoleto,
     title: 'Boleto CUIDAR.',
    });
  }

  return (
    <Container visible={modal.modalName === 'modalBoleto' && modal.active === true} presentationStyle="formSheet" >
        <Header closeButton={false} modalBoleto>
          <Content>
            <Button onPress={compartilha}>
              <Icon name={'share'} size={30} color={'#ffffff'} />
            </Button>
            <CloseModal />
          </Content>
        </Header>
        <WebView allowFileAccessFromFileURLs source={{uri:linkBoleto}} startInLoadingState={true} renderLoading={Loading} />
    </Container>
  )
}
