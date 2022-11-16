import React from 'react';

import Header from '../../components/Header';
import Card from './components/Card';

import {Container, Content} from './style';

const Protecoes: React.FC = () => {
  return (
    <Container>
      <Content>
        <Header
          title={`Proteção completa${'\n'}para seu veículo.`}
          description={`Aqui na CUIDAR é importante que você e seu veículo estejam completamente seguros, portanto desenvolvemos as proteções mais completas do mercado.`}
        />

        <Card
          title={'Roubo e furto'}
          image={require('../../imagens/roubo.png')}
          description={'Se seu carro for roubado ou furtado e não for encontrado a gente paga uma indenização de até 100% da FIPE para você.'}
        />

        <Card
          title={'Proteção a terceiros'}
          image={require('../../imagens/terceiros.png')}
          description={'Colidiu com outro carro? Não se preocupe. A CUIDAR tem proteção para terceiros. Assim a gente arruma o carro do terceiro e o seu.'}
        />

        <Card
          title={'Batidas e perda total'}
          image={require('../../imagens/colisao.png')}
          description={'Bateu o carro em algum lugar ou deu perda total? Não se desespere. Associados CUIDAR também contam com proteção para esses casos.'} />

        <Card
          title={'Incêndio e Fenômenos da Natureza'}
          image={require('../../imagens/incendio.png')}
          description={'Se o carro pegar fogo, cair uma chuva de granizo, ou acontecer um alagamento, você tem proteção veicular da CUIDAR.'}
        />

        <Card
          title={'Proteção de vidros, faróis, lanternas e retrovisores'}
          image={require('../../imagens/vidros.png')}
          description={'Todos nossos novos associados tem proteção de vidros, faróis, lanternas e retrovisores. Aqui não existe proteção a parte.'}
        />

        <Card
          title={'Rastreamento e monitoramento grátis'}
          image={require('../../imagens/rastreamento.png')}
          description={'Rastreamento e monitoramento grátis para todos os novos associados. E você pode acompanhar seu veiculo aqui pelo APP.'}
        />
      </Content>
    </Container>
  );
};

export default Protecoes;
