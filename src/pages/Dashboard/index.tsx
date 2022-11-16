import React, {useContext, useEffect, useLayoutEffect,} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContext from '../../contexts/auth';
import TrackContext from '../../contexts/rastreamento';

import Loading from '../../components/Loading';
import Card from './components/Card';
import Indicacao from './components/Indicacao';

import {Container, Content} from './style';

const Dashboard: React.FC = () => {
  const {user, loading} = useContext(AuthContext);
  const {loginSmart} = useContext(TrackContext);

  useLayoutEffect(() => {
  loginSmart();
  }, []);

  async function setaUser() {
    const responseBuscaAssociado = JSON.stringify(user);
    await AsyncStorage.setItem(
      '@CUIDAR:AssociadoLogado',
      responseBuscaAssociado,
    );
  }

  useEffect(() => {
    setaUser();
  }, []);

  if (loading) {
    <Loading />
  }

  return (
    <Container>
      <Content>
        {user.cpf === '07010305692' && (
          <Card
            admin
            description={`Olá Alex!${'\n'}Acesse aqui a área administrativa.`}
            icon={'user'}
            iconColor={'#ffffff'}
            navigateTo={'Admin'}
          />
        )}

        <Card
          destaque
          description={`Conheça nosso clube de descontos. São mais de 1.000 estabelecimentos em todo Brasil e na internet.`}
          icon={'dollar-sign'}
          iconColor={'#ffffff'}
          navigateTo={'ClubeCerto'}
        />

        <Card
          rastreamento
          description={`Seu veículo tem rastreador? Saiba onde ele está a qualquer hora aqui no APP.`}
          icon={'navigation'}
          iconColor={'#ffffff'}
          navigateTo={'Rastreamento'}
        />

        <Card
          description={`Proteção de verdade e que vai muito além do seu veículo.`}
          icon={'shield'}
          iconColor={'#ff9800'}
          navigateTo={'Protecoes'}
        />

        <Card
          description={`Estamos com você onde você estiver e sempre que precisar.`}
          image={require('../../imagens/truck.png')}
          navigateTo={'Assistencia'}
        />

        <Indicacao title={'Já indicou um amigo hoje?'} description={'Indique um amigo agora mesmo e se ele fizer a proteção você ganha 100% de desconto na sua próxima mensalidade.'} />

      </Content>
    </Container>
  );
};

export default Dashboard;
