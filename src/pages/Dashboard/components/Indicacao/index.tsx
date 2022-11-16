import React, {useContext, useState} from "react";
import {Alert} from 'react-native';

import AuthContext from "../../../../contexts/auth";

import { Input } from '../../../../components/Input';
import { Button } from '../../../../components/Button';
import sendIndicacao from '../../../../utils/sendIndicacao';

import { Container, Text } from "./styles";

export default function Indicacao({title, description}) {
  const {user} = useContext(AuthContext);
  const [dadosVeiculo] = user.veiculos.filter(item => item.id_situacao === 1);
  const [telefoneAmigo, setTelefoneAmigo] = useState('');
  const [nomeAmigo, setNomeAmigo] = useState('');

  async function sendMail() {

    if (!nomeAmigo) {
      Alert.alert('Atenção', 'Preencha o nome do seu amigo para continuar.');
    }

    if (telefoneAmigo.length < 12) {
      Alert.alert('Atenção', 'Preencha o telefone corretamente para continuar.');
    }

    if (nomeAmigo && telefoneAmigo.length >= 11) {
      try {
        await sendIndicacao({user: {nome: user.nome, cpf: user.cpf, telefone_fixo: user.telefone_fixo, telefone_celular: user.telefone_celular, veiculos: dadosVeiculo}, nomeAmigo, telefoneAmigo})
        .then(() => {
          Alert.alert(
            'Sucesso!',
            'Mensagem enviada com sucesso.'
          );
          setNomeAmigo('');
          setTelefoneAmigo('');
        });
      } catch {
        Alert.alert(
          'Algo deu errado.',
          'Houve um erro no envio da mensagem. Por favor, tente novamente.',
        );
      }
    }
  }

  return (
    <Container>
      <Text title>
        {title}
      </Text>
      <Text description>
        {description}
      </Text>
      <Input indicacao editable={false} value={user.nome} />
      <Input indicacao editable={false} value={dadosVeiculo.placa} />
      <Input
        indicacao
        placeholder={'Nome do seu amigo'}
        placeholderTextColor={'#888888'}
        onChangeText={(text: string) => setNomeAmigo(text)}
        value={nomeAmigo}
      />
      <Input
        indicacao
        placeholder={'Telefone do seu amigo'}
        keyboardType={'phone-pad'}
        placeholderTextColor={'#888888'}
        onChangeText={(text: string) => setTelefoneAmigo(text)}
        value={telefoneAmigo}
      />
      <Button onPress={sendMail} avanca>
        <Text enviar>Enviar</Text>
      </Button>
    </Container>
  )
}
