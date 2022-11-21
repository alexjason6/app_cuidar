import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';
import {
  RefreshControl,
  Alert,
} from 'react-native';
import 'moment/locale/pt-br';
import moment from 'moment';

import TrackContext from '../../contexts/trackerContext';
import ModalContext from '../../contexts/modalContext';

import SmartService from "../../services/SmartService";
import Loading from '../../components/Loading';
import ModalMap from './components/ModalMap';
import ModalHistory from './components/ModalHistory';
import Error from './components/Error/error';
import Header from '../../components/Header';
import Card from './components/Card';
import { Button } from '../../components/Button';

import {Container, Content, View, Text} from './styles';

export const Rastreamento: React.FC = () => {
  const {devices, error, loading, getDevices, tokenAssociadoGPS} = useContext(TrackContext);
  const {modal, changeModal} = useContext(ModalContext)
  const [refreshing, setRefreshing] = useState(false);
  const [equipamento, setEquipamento] = useState(0);
  const [deviceHistory, setDeviceHistory] = useState([]);
  const dataSelected = moment().format('DD-MM-YYYY');

  useLayoutEffect(() => {
    getDevices();
  }, [])

  async function getHistory(index: number) {
    setEquipamento(index);
    const id: string = devices[index].id;

    await SmartService.getHistory({token: tokenAssociadoGPS, id, dataSelected})
    .then((response) => setDeviceHistory(response.items))
    .then(() => changeModal({modalName: 'modalHistory', active: true, device: index}))
    .catch(() => {
      Alert.alert('Atenção!', 'Alguma coisa não saiu como o esperado. Por favor, tente novamente.');
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    const wait = async function pegaDevices() {
      getDevices();
    };
    wait().then(() => setRefreshing(false));
  }, [getDevices]);

  async function openModal(index: number) {
    setEquipamento(index);
    changeModal({modalName: 'modalMap', active: true, device: index})
  }

  useEffect(() => {
    setTimeout(() => {
      onRefresh();
    }, 15000);
  }, [devices, equipamento]);

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Loading />;
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
      }
      >
        <Header
          title={'Seu veículo sempre na palma da sua mão.'}
          description={' O mapa é atualizado a cada minuto e caso necessite de uma atualização mais rápida, puxe a página para baixo até ver o indicador de carregamento.'}
        />
        {devices.map((device, index) => (
          <Card device={device} equipamento={index} key={index}>
            <View Buttons>
              <Button
                mapView
                onPress={() => openModal(index)}
              >
                <Text mapa>Mapa</Text>
              </Button>
              <Button
                historyView
                onPress={() => getHistory(index)}
              >
                <Text historico>Histórico</Text>
              </Button>
            </View>
          </Card>
        ))}
      </Content>
      <ModalMap visible={modal.modalName === 'modalMap' && modal.active === true ? true : false} />
      <ModalHistory visible={modal.modalName === 'modalHistory' && modal.active === true ? true : false} historico={deviceHistory} />
    </Container>
  );
};

export default Rastreamento;
