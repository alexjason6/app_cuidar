import React, {useContext, useState, useCallback} from 'react';
import { Alert, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';

import AuthContext from '../../contexts/auth';
import ModalContext from '../../contexts/modalContext';

import cpfFormat from '../../utils/cpfFormat';
import cnpjFormat from '../../utils/cnpjFormat';
import Loading from  '../../components/Loading';
import Header from '../../components/Header';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import ModalVehicle from './components/ModalVehicle';
import HinovaService from '../../services/HinovaService';
import Vehicles from './components/Vechicles';
import Card from './components/Card';

import {Container, Content, ButtonVehicle, Text} from './style';


export default function AreaAssociado() {
  const {user, loading, tokenAssociadoHinova, refreshToken, refreshAssociado} = useContext(AuthContext);
  const navigation = useNavigation();
  const {changeModal} = useContext(ModalContext);
  const [dadosVeiculo, setDadosVeiculo] = useState({});
  const [produtos, setProdutos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    const wait = async function refreshData() {
      refreshToken();
      refreshAssociado();
    };
    wait().then(() => setRefreshing(false));
  }, [refreshToken]);

  async function buscaVeiculo(carro: number) {
     await HinovaService.getVehicle({token: String(tokenAssociadoHinova), placa: user.veiculos[carro].placa})
    .then(([response]) => setDadosVeiculo(response))
    .catch(() => {
      Alert.alert('Erro!', 'Alguma coisa deu errado. Por favor tente novamente.');
    });

    if (dadosVeiculo) {
      await buscaProdutos(carro);
    }
  }

  async function buscaProdutos(carro: number) {
    await HinovaService.getProducts({token: String(tokenAssociadoHinova), placa:  user.veiculos[carro].placa})
    .then((response) => setProdutos(response.produtos))
    .then(() => changeModal({modalName: 'vehiclesDetails', active: true, device: carro}))
    .catch(() => Alert.alert('Atenção', 'Não Foi possível carregar os produtos. Tente novamente mais tarde.'));
  }

  if (loading) {
    <Loading />
  }

  return (
    <Container>
      <Content
      refreshControl={
        <RefreshControl
          title="Arraste para baixo para atualizar os dados"
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={'#444444'}
          titleColor={'#444444'}
        />
      } >
        <Header
          title={`Olá, ${user.nome.split(' ')[0]}!`}
          description={'Aqui você pode gerenciar os dados dos seus veículo cadastrados conosco e o seus dados pessoais, além de acessar a área financeira.'} children={undefined} closeButton={false} />

        <Card title={'Dados pessoais'}>
          <Text label>Nome/Razão social</Text>
          <Input dados editable={false}>{user.nome}</Input>

          <Text label>Data de nascimento</Text>
          <Input dados editable={false}>{moment(user.data_nascimento).format('DD/MM/YYYY')}</Input>

          <Text label>CPF/CNPJ:</Text>
          <Input dados editable={false}>{user.cpf.length >= 15 ? cnpjFormat(user.cpf) : cpfFormat(user.cpf)}</Input>

          <Button
            edita
            onPress={() => navigation.navigate('DadosAssociado')}>
            <Text edita>Visualizar todos os dados</Text>
            <Icon name="arrow-right" color={'#FF9800'} size={18} />
          </Button>
        </Card>

        <Card title={'Financeiro'}>
          <Button
            boletos
            onPress={() => navigation.navigate('Boletos')}>
            <Text boletos>Acessar meus boletos</Text>
          </Button>
        </Card>

        <Card title={'Veículos'}>
          {user.veiculos
            .sort((a, b) => a.placa > b.placa ? 1 : -1)
            .sort((a, b) => a.codigo_situacao > b.codigo_situacao ? 1 : -1)
            .map((veiculo: {situacao: string, chassi: string, placa: string, descricao_modelo: string}, key) => (
              <Vehicles key={key} >
                <ButtonVehicle onPress={() => buscaVeiculo(key)}>
                  <Text placaAtiva={veiculo.situacao === 'ATIVO' ? true : false} placaInativa={veiculo.situacao !== 'ATIVO' ? true : false}>{veiculo.placa}</Text>
                  <Text modeloAtivo={veiculo.situacao === 'ATIVO' ? true : false} modeloInativo={veiculo.situacao !== 'ATIVO' ? true : false}>{veiculo.descricao_modelo}</Text>
                  <Text statusAtivo={veiculo.situacao === 'ATIVO' ? true : false} statusInativo={veiculo.situacao !== 'ATIVO' ? true : false}>{veiculo.situacao}</Text>
                  <Text chassi>Chassi: {veiculo.chassi}</Text>
                </ButtonVehicle>
              </Vehicles>
            ))
          }
        </Card>
      </Content>

      <ModalVehicle produtos={produtos} veiculoData={dadosVeiculo} />
    </Container>
  );
}
