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
import Icon from 'react-native-vector-icons/Feather';

import TrackContext from '../../contexts/rastreamento';
import ModalContext from '../../contexts/modalContext';

import SmartService from "../../services/SmartService";
import Loading from '../../components/Loading';
import ModalMap from './components/ModalMap';
import ModalHistory from './components/ModalHistory';
import Error from './error';
import Header from '../../components/Header';
import Card from './components/Card';
import { Button } from '../../components/Button';
import Infos from './components/Infos'

import {Container, Content, View, Text, ChangeDevice} from './styles';

export const Rastreamento: React.FC = () => {
  const {devices, error, loading, getDevices, tokenAssociadoGPS} = useContext(TrackContext);
  const {modal, changeModal} = useContext(ModalContext)
  const [refreshing, setRefreshing] = useState(false);
  const [equipamento, setEquipamento] = useState(0);
  const [deviceHistory, setDeviceHistory] = useState([]);
  const [endereco, setEndereco] = useState('');
  const trata = deviceHistory.filter((device) => device.items);
  const trata2 = trata.map((item) => item.items);
  const tailH = trata2.map((item) => item.map((item) => item));
  const tailH2 = tailH.flatMap((item) => item);
  const data = [
    {data: moment().format('DD-MM-YYYY')},
    {data: moment().subtract(1, 'days').format('DD-MM-YYYY')},
    {data: moment().subtract(2, 'days').format('DD-MM-YYYY')},
    {data: moment().subtract(3, 'days').format('DD-MM-YYYY')},
    {data: moment().subtract(4, 'days').format('DD-MM-YYYY')},
    {data: moment().subtract(5, 'days').format('DD-MM-YYYY')},
    {data: moment().subtract(6, 'days').format('DD-MM-YYYY')}
  ];
  const [dataSelected, setDataSelected ] = useState(moment().format('DD-MM-YYYY'));

  useLayoutEffect(() => {
    getDevices();
  }, []);

  async function getAddress() {
    await SmartService.getAddress({latitude: devices[equipamento].lat, longitude: devices[equipamento].lng})
    .then((response) => setEndereco(response))
  }

  async function getHistory(index: number) {
    setEquipamento(index);
    const id: string = devices[index].id;

    await SmartService.getHistory({token: tokenAssociadoGPS, id, dataSelected})
    .then((response) => setDeviceHistory(response.items))
    .then(() => changeModal({modalName: 'modalHistory', active: true, device: equipamento}))
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

  async function handleChangeDevice(direction: string) {
    if (direction === 'minus') {
      setEquipamento(equipamento - 1);
      changeModal({modalName: 'modalMap', active: true, device: equipamento - 1});
    }

    if (direction === 'plus') {
      setEquipamento(equipamento + 1);
      changeModal({modalName: 'modalMap', active: true, device: equipamento + 1});
    }
  }

  useEffect(() => {
    getAddress();
    setTimeout(() => {
      onRefresh();
    }, 15000);
  }, [devices, equipamento]);

  if (error) {
    return <Error />;
  }

  if (loading) {
    return (
      <Loading />
    );
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
      <ModalMap equipamento={devices[equipamento]} visible={modal.modalName === 'modalMap' && modal.active === true ? true : false}>
        { devices.length > 1 && (
        <View changeDevice>
          {equipamento >= 1 &&
          <ChangeDevice minus onPress={() => handleChangeDevice('minus')}>
            <Icon name={'arrow-left'} size={28} color={'#0c71c3'} />
          </ChangeDevice>
          }
          {devices.length - 1 === equipamento ? null : (
          <ChangeDevice plus onPress={() => handleChangeDevice('plus')}>
            <Icon name={'arrow-right'} size={28} color={'#0c71c3'} />
          </ChangeDevice>
          )}
        </View>
        )}

        <Infos
          deviceName={devices[equipamento].name.split(' ')[0]}
          colorIconDevice={devices[equipamento].online === 'online' ? '#ff9800' : '#cccccc'}
          ignition={devices[equipamento].online === 'online' ? 'Ligado' : 'Desligado'}
          colorIconIgnition={devices[equipamento].online === 'online' ? '#0c71c3' : '#cccccc'}
          speed={`${devices[equipamento].speed} km/h`}
          timeStoped={devices[equipamento].stop_duration}
          address={endereco}
          refreshAt={moment.unix(devices[equipamento].timestamp).locale('pt-br').fromNow()}
        />
      </ModalMap>

      <ModalHistory equipamento={devices[equipamento]} visible={modal.modalName === 'modalHistory' && modal.active === true ? true : false} historico={deviceHistory} />
    </Container>
  );
};

export default Rastreamento;
