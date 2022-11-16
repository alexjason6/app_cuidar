import React, { useContext, useState } from "react";
import { Keyboard, Alert, StatusBar } from "react-native";
import {useNavigation} from '@react-navigation/native';

import ModalContext from '../../../../contexts/modalContext';

import CloseModal from '../../../../components/FechaModal';
import { Button } from "../../../../components/Button";
import { Input } from '../../../../components/Input'
import formatPhone from '../../../../utils/phoneFormat';
import formatEmail from '../../../../utils/emailFormat';

import {Container, Text, View} from './styles';

export function ModalVisitante({currentPosition}) {
  const {modal, changeModal} = useContext(ModalContext);
  const [nomeVisitante, setnomeVisitante] = useState<string>();
  const [telefoneVisitante, setTelefoneVisitante] = useState<string>('');
  const [emailVisitante, setEmailVisitante] = useState<string>('');
  const navigation = useNavigation();

  const dadosVisitante = {
    nome: nomeVisitante,
    telefone: telefoneVisitante,
    email: emailVisitante,
    cordenadas: currentPosition,
  };

  function navegaEndereco() {
    if (!nomeVisitante || !emailVisitante || !telefoneVisitante) {
      Alert.alert('Atenção', 'Preencha todos os dados para continuar.');
    } else if (telefoneVisitante.length < 12) {
      Alert.alert(
        'Atenção',
        'Digite todos os números do telefone para continuar.',
      );
    } else if (emailVisitante) {
      if (formatEmail(emailVisitante) === false) {
        Alert.alert(
          'Atenção',
          'Preencha seu email corretamente para continuar.',
        );
      } else {
        navigation.navigate('ColetaEndereco', {dadosVisitante});
        changeModal({modalName: '', active: false, device: 0});
      }
    }
  };

  function handlePhoneChange(event: any) {
    setTelefoneVisitante(formatPhone(event));
  };

  return (
    <Container animationType="slide" presentationStyle="formSheet" visible={modal.modalName === 'visitante' && modal.active === true} >
      <StatusBar barStyle={'dark-content'} animated={true} />
      <View>
        <CloseModal/>
        <Text modalText>
          Por favor, digite os dados abaixo.
        </Text>
        <Input
          value={nomeVisitante}
          placeholder="Seu nome"
          autoCompleteType={'name'}
          autoCapitalize={'words'}
          placeholderTextColor={'#666666'}
          onChangeText={(text: string) => setnomeVisitante(text)}
          onEndEditing={Keyboard.dismiss}
          returnKeyType={'next'}
        />
        <Input
          value={telefoneVisitante}
          keyboardType={'phone-pad'}
          placeholder="Seu telefone"
          placeholderTextColor={'#666666'}
          onChangeText={handlePhoneChange}
          onEndEditing={Keyboard.dismiss}

        />
        <Input
          value={emailVisitante}
          placeholder="Seu e-mail"
          keyboardType={'email-address'}
          placeholderTextColor={'#666666'}
          autoCapitalize={'none'}
          autoCompleteType={'email'}
          autoCorrect={false}
          onChangeText={(text: string) => setEmailVisitante(text)}
          onEndEditing={Keyboard.dismiss}
          returnKeyType={'send'}
        />
        <Button
          avanca
          onPress={navegaEndereco}>
          <Text>Avançar</Text>
        </Button>
      </View>
    </Container>
  );
}