import React, {useContext, useCallback, useState} from 'react';
import {
  Linking,
  RefreshControl,
} from 'react-native';

import AuthContext from '../../../../contexts/authContext';
import TrackContext from '../../../../contexts/trackerContext';

import Header from '../../../../components/Header';
import {Button} from '../../../../components/Button';

import {Container, Text,} from './styles.js';

export const ErroRastreamento: React.FC = () => {
  const {user} = useContext(AuthContext);
  const {getDevices, loginSmart} = useContext(TrackContext);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    const wait = async function pegaDevices() {
      await loginSmart();
      getDevices();
    };
    wait().then(() => setRefreshing(false));
  }, [getDevices]);

  return (
    <Container refreshControl={
      <RefreshControl
        title="Arraste para baixo para atualizar os dados"
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor={'#444444'}
        titleColor={'#444444'}
      />
    }>
      <Header title={'Alguma coisa está errada.'} description={'Aparentemente o seu veículo não possui rastreador ou aconteceu algum erro na exibição dos veículos rastreados.'} />
        <Text>
          Se seu veículo já rastreador e não está aparecendo aqui, entre em
          contato com a gente e assim verificaremos o motivo do erro e
          resolveremos o problema.
        </Text>

        <Text>
          Caso seu veículo não tenha rastreador, entre em contato conosco e
          solicite a instalação de um equipamento.
        </Text>

        <Button
          avanca
          onPress={() => {
            Linking.openURL(
              `https://api.whatsapp.com/send?phone=553141122430&text=Olá, sou o *${
                user.nome.split(' ')[0]
              }*, estava no *APP da CUIDAR* e gostaria de tirar uma dúvida.`,
            );
          }}
        >
          <Text botao>Fale conosco</Text>
        </Button>
    </Container>
  );
};

export default ErroRastreamento;
