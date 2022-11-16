import React, { useContext } from "react";
import { Modal, SafeAreaView, ScrollView } from "react-native";
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFI from 'react-native-vector-icons/Feather';

import ModalContext from "../../../contexts/modalContext";

import Header from '../../../components/Header';
import AssistenciaCarros from './components/carros';
import AssistenciaMotos from './components/motos';
import RegulamentoAssociado from "./components/associado";
import CarroReserva from "./components/carroReserva";
import Vidros from "./components/vidros";

import { Container, Content, RegulamentosView, Regulamento, Text } from "./styles";

export default function Regulamentos() {
  const {modal, changeModal} = useContext(ModalContext); 

  function handleChangeModal(modalName: string) {

    if (modal.modalName === modalName) {
      changeModal({modalName: '', active: false, device: 0})
    } else {
      changeModal({modalName: modalName, active: true, device: 0});
    }
  }

  return (
    <Container>
      <Content>
        <Header title={'Regulamentos de funcionamento dos serviços'} description={'Acompanhe sempre que precisar os regulamentos para saber como tudo funciona aqui.'} children={undefined} closeButton={undefined} modalBoleto={undefined} />
        <RegulamentosView>
          <Regulamento onPress={() => handleChangeModal('modalRegulamentoAssociado')}>
            <IconFI name={'user'} color={'#FF9800'} size={35} />
            <Text titleIcon>Associado</Text>
          </Regulamento>
          <Regulamento onPress={() => handleChangeModal('modalRegulamentoAssistenciaCarro')}>
            <IconMCI name={'car'} color={'#FF9800'} size={35} />
            <Text titleIcon>Assistência 24h - Carros</Text>
          </Regulamento>
          <Regulamento onPress={() => handleChangeModal('modalRegulamentoAssistenciaMoto')}>
            <IconMCI name={'bike'} color={'#FF9800'} size={35} />
            <Text titleIcon>Assistência 24h - Motocicletas</Text>
          </Regulamento>
          <Regulamento onPress={() => handleChangeModal('modalRegulamentoCarroReserva')}>
            <IconMCI name={'car-multiple'} color={'#FF9800'} size={35} />
            <Text titleIcon>Carro Reserva</Text>
          </Regulamento>
          <Regulamento onPress={() => handleChangeModal('modalRegulamentoVidros')}>
            <IconMCI name={'car-info'} color={'#FF9800'} size={35} />
            <Text titleIcon>Proteção Vidros, faróis, lanternas e retrovisores</Text>
          </Regulamento>
        </RegulamentosView>
      </Content>

      <Modal visible={modal.modalName === 'modalRegulamentoAssociado' || modal.modalName === 'modalRegulamentoVidros' || modal.modalName === 'modalRegulamentoCarroReserva' || modal.modalName === 'modalRegulamentoAssistenciaMoto' || modal.modalName === 'modalRegulamentoAssistenciaCarro' && modal.active === true} presentationStyle="pageSheet" animationType="slide">
        <SafeAreaView>
          <ScrollView>
            <Header
              title={
                modal.modalName === 'modalRegulamentoAssociado' ?
                'REGIMENTO INTERNO DE BENEFÍCIOS AOS ASSOCIADOS.' :
                modal.modalName === 'modalRegulamentoAssistenciaCarro' ?
                'REGULAMENTO BENEFÍCIO ASSISTÊNCIA CARROS' :
                modal.modalName === 'modalRegulamentoCarroReserva' ?
                'Regulamento Carro reserva.' :
                modal.modalName === 'modalRegulamentoVidros' ?
                'Regulamento Vidros, faróis, lanternas e retrovisores.' : 'REGULAMENTO BENEFÍCIO ASSISTÊNCIA MOTOCICLETAS'}
              description={'Leia abaixo todos os detalhes de funcionamento da CUIDAR.'} closeButton >
            </Header>
            {modal.modalName === 'modalRegulamentoAssociado' && <RegulamentoAssociado />}
            {modal.modalName === 'modalRegulamentoAssistenciaCarro' && <AssistenciaCarros />}
            {modal.modalName === 'modalRegulamentoAssistenciaMoto' && <AssistenciaMotos />}
            {modal.modalName === 'modalRegulamentoCarroReserva' && <CarroReserva />}
            {modal.modalName === 'modalRegulamentoVidros' && <Vidros />}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </Container>
  )
}
