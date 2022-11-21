import React, { useContext, useState } from "react";
import { Keyboard, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import ModalContext from '../../../../contexts/modalContext';
import AuthContext from "../../../../contexts/authContext";

import formatCnpj from "../../../../utils/cnpjFormat";
import formatCpf from "../../../../utils/cpfFormat";
import  CloseModal from '../../../../components/FechaModal';
import { Button } from "../../../../components/Button";
import { Input } from '../../../../components/Input'

import {Container, Text, View} from './styles';

export function Modal({conectado}) {
  const {modal} = useContext(ModalContext);
  const {tokenAssociadoHinova, buscaAssociado} = useContext(AuthContext);
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [cpfCnpjExtracted, setCpfCnpjExtracted] = useState('');

  function handleCpfOrCnpjChange(event: any) {
    setCpfCnpjExtracted(event);
    if (event.length <= 11) {
      setCpfCnpj(formatCpf(event));
    } else {
      setCpfCnpj(formatCnpj(event));
    }
  };

  async function handleSignIn() {
    if (conectado) {
      await SetaDados();
    } else {
      Alert.alert(
        'Sem internet.',
        'Confira os dados digitados ou se sua internet está funcionando e tente novamente.',
      );
    }
  };

  async function SetaDados() {
    if (cpfCnpj.length >= 8) {
      buscaAssociado(String(tokenAssociadoHinova), cpfCnpj);
      await AsyncStorage.multiSet([
        ['@CUIDAR:cpfAssociado', cpfCnpj],
        ['@CUIDAR:cpfAssociadoExtracted', cpfCnpjExtracted],
      ])
    } else {
      Alert.alert(
        'Atenção.',
        'Digite o CPF ou CNPJ cadastrado para continuar.',
      );
    }
  };

  return (
    <Container animationType={"slide"} presentationStyle={"formSheet"} visible={modal.modalName === 'associado' && modal.active === true} >
      <View>
        <CloseModal />
        <Text modalText>
          Por favor, digite os dados abaixo.
        </Text>
        <Input
          placeholder='CPF ou CNPJ cadastrado'
          placeholderTextColor='#888888'
          onChangeText={handleCpfOrCnpjChange}
          value={cpfCnpj}
          keyboardType='phone-pad'
          onEndEditing={Keyboard.dismiss}
          maxLength={18}
        />
        <Button
          avanca
          onPress={handleSignIn}>
          <Text>Avançar</Text>
        </Button>
      </View>
    </Container>
  );
}
