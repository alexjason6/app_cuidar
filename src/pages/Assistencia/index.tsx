import React from 'react';
import { Linking, Platform }from 'react-native';

import Header from '../../components/Header';
import {Button} from '../../components/Button';

import {Container, Content, Text} from './style';
import Card from './components/Card';

const Assistencia: React.FC = () => {
  function dialCall() {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${08002567000}';
    } else {
      phoneNumber = 'telprompt:${08002567000}';
    }

    Linking.openURL(phoneNumber);
  }

  return (
    <Container>
      <Content>

        <Header
          title={'Assistência 24h, 7 dias por semana e 365 dias por ano.'}
          description={`Você pode estar em qualquer canto do Brasil. São milhares de prestadores cadastrados e todos prontos para te atender na hora que você mais precisar.${'\n\n\n'}Caso queira solicitar assistência é só clicar no botão abaixo.`}  
        >
          <Button avanca onPress={() => dialCall()}>
            <Text>Ligar para Assistência 24h</Text>
          </Button>
        </Header>

        <Card
          title={'Reboque 24H com KM livre para colisões'}
          image={require('../../imagens/kmlivre.png')}
          description={'No Brasil todo o seu carro está protegido com a CUIDAR e conta com reboque sem limite de quilometragem em caso de colisões.'}
        />

        <Card
          title={'Serviço de Chaveiro 24h'}
          image={require('../../imagens/kmlivre.png')}
          description={'No Brasil todo o seu carro está protegido com a CUIDAR e conta com reboque sem limite de quilometragem em caso de colisões.'}
        />

        <Card
          title={'Socorro em caso de pane elétrica ou mecânica'}
          image={require('../../imagens/bateria.png')}
          description={'Se o seu veículo apresentar um defeito na parte elétrica e não ligar, ou se aconteceu alguma coisa na parte mecânica. Ligue no 0800 e nós vamos te ajudar.'}
        />

        <Card
          title={'Socorro falta de combustível'}
          image={require('../../imagens/gasolina.png')}
          description={'Se acabar o combustível na hora que você mais precisar, ligue para nosso 0800 e solicite um auxílio pane seca.'}
        />

        <Card
          title={'Socorro para pneu furado'}
          image={require('../../imagens/pneu.png')}
          description={'Se o pneu esvaziar ou você acertar um buraco e furar o pneu do carro, você pode contar com nossa assistência caso não consiga resolver sozinho.'}
        />

        <Card
          title={'Atuação em todo Brasil'}
          image={require('../../imagens/brasil.png')}
          description={'A CUIDAR tem atuação nacional para Proteções e Assistência 24h.Em todo Brasil você pode ligar para nossa assistência que estamos prontos para ajudar.'}
        />
      </Content>
    </Container>
  );
};

export default Assistencia;
