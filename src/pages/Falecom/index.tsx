import React, { useContext, useState } from 'react';
import { Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

import AuthContext from '../../contexts/authContext';

import sendEmail from '../../utils/sendEmail';
import Header from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import phoneFormat from '../../utils/phoneFormat';

import {Container, Content, Dados, Text} from './style';

const Falecom: React.FC = () => {
  const {user} = useContext(AuthContext);
  const [setor, setSetor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigation = useNavigation();
  const [dadosVeiculo] = user.veiculos.filter((item) => item.codigo_situacao === '1');

  async function sendMail() {

    if (!setor) {
      Alert.alert('Atenção', 'Escolha um setor para continuar.');
    }

    if (!mensagem) {
      Alert.alert('Atenção', 'Escreva sua mensagem.');
    }
    if (setor && mensagem) {
      try {
        sendEmail({setor, mensagem, user, dadosVeiculo})
        .then(() => {
          Alert.alert('Mensagem enviada com sucesso.');
          VoltaPage();
        });
      } catch {
        Alert.alert(
          'Erro',
          'Houve um erro no envio da mensagem. Por favor, tente novamente.',
        );
      }
    }
  }

  function VoltaPage() {
    navigation.navigate('Home');
  }

  return (
    <Container>
      <Content>
        <Header
          title={'Se precisar falar com a gente é só mandar uma mensagem.'}
          description={'Preencha os campos abaixo e envie sua mensagem, ela será encaminhada para o setor responsável e te retornaremos em breve.'}
        />
        <Dados>
          <Input
            value={user.nome}
            editable={false}
            indicacao
          />
          <Input
            value={user.email}
            editable={false}
            indicacao
          />
          <Input
            placeholderTextColor={'#888888'}
            keyboardType={'phone-pad'}
            value={phoneFormat(user.telefone_celular)}
            editable={false}
            indicacao
          />

          <Input
            placeholder={'Placa do seu veículo'}
            placeholderTextColor={'#888888'}
            value={dadosVeiculo.placa}
            editable={false}
            indicacao
          />
          <DropDownPicker
            placeholder={'Setor desejado'}
            items={[
              {label: 'Administrativo', value: 'administrativo'},
              {label: 'Financeiro', value: 'financeiro'},
              {label: 'Rastreamento', value: 'rastreamento'},
              {label: 'Acidentes', value: 'sinistros'},
              {label: 'Comercial', value: 'vendas'},
              {label: 'Assistência 24h', value: 'assistencia'},
            ]}
            dropDownStyle={{marginTop: 2, backgroundColor: '#fafafa'}}
            containerStyle={{width: '80%', height: 45, margin: 10}}
            style={{backgroundColor: '#ffffff', borderWidth: 0}}
            onChangeItem={item => setSetor(item.value)}
            labelStyle={{color: '#444444'}}
          />
          <Input
            placeholder={'Digite aqui a sua mensagem'}
            placeholderTextColor={'#888888'}
            onChangeText={text => {
              setMensagem(text);
            }}
            multiline={true}
            indicacao
            textArea
          />
          <Button avanca onPress={sendMail}>
            <Text>Enviar</Text>
          </Button>
        </Dados>
      </Content>
    </Container>
  );
};

export default Falecom;
