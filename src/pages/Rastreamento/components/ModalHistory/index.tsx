import React, {useContext, useEffect, useState} from "react"
import { Dimensions, Platform } from "react-native"
import 'moment/locale/pt-br';
import moment from 'moment';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import IconeMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconeArrow from 'react-native-vector-icons/Feather';

import SmartService from "../../../../services/SmartService";

import TrackContext from '../../../../contexts/trackerContext';
import ModalContext from '../../../../contexts/modalContext';

import mapStyle from '../../mapStyle';
import CloseModal from "../../../../components/FechaModal";
import Loading from "../../../../components/Loading";

import { Modal, View, Text, ChangeViagem } from "./styles";

export default function ModalHistory({ visible, historico }) {
  const [loading, setLoading] = useState(true);
  const { devices, tokenAssociadoGPS } = useContext(TrackContext);
  const { modal } = useContext(ModalContext);
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const [history, setHistory] = useState(historico);
  const getItems1 = history.length > 0 ? history.filter((item: {status: number}) => item.status ? item.status === 1 : item.status === 3) : [];
  const getItems2 = history.length > 0 ? getItems1.map((item) => item.items) : [];
  const [viagem, setViagem] = useState(0);
  const tail = history.length > 0 ? getItems2[viagem].map((item) => ({latitude: item.lat, longitude: item.lng, speed: item.speed, time: item.time})) : [];
  const viagemTotal = tail.length;
  const viagemInicial = tail.length > 0 ? {latitude: tail[0].latitude, longitude: tail[0].longitude, time: tail[0].time} : {latitude: 0, longitude: 0};
  const viagemFinal = tail.length > 0 ? {latitude: tail[viagemTotal - 1].latitude, longitude: tail[viagemTotal - 1].longitude, time: tail[viagemTotal - 1].time} : {latitude: 0, longitude: 0};
  const [enderecoInicial, setEnderecoInicial] = useState('');
  const [enderecoFinal, setEnderecoFinal] = useState('');
  const data = [
    {data: moment().format('DD-MM-YYYY')},
    {data: moment().subtract(1, 'days').format('DD-MM-YYYY')},
    {data: moment().subtract(2, 'days').format('DD-MM-YYYY')},
    {data: moment().subtract(3, 'days').format('DD-MM-YYYY')},
    {data: moment().subtract(4, 'days').format('DD-MM-YYYY')},
    {data: moment().subtract(5, 'days').format('DD-MM-YYYY')},
    {data: moment().subtract(6, 'days').format('DD-MM-YYYY')}
  ];
  const [currentData, setCurrentData] = useState(0);

  async function getInicialAddress() {
    await SmartService.getAddress({latitude: viagemInicial.latitude, longitude: viagemInicial.longitude})
    .then((response) => setEnderecoInicial(response));
  }

  async function getFinalAddress() {
    await SmartService.getAddress({latitude: viagemFinal.latitude, longitude: viagemFinal.longitude})
    .then((response) => setEnderecoFinal(response))
  }

  async function getHistory(direction: string) {
    setLoading(true);
    const newData = direction === 'dayAfter' ? currentData + 1 : currentData - 1;
    setCurrentData(newData);

    await SmartService.getHistory({token: String(tokenAssociadoGPS), id: devices[modal.device].id, dataSelected: data[newData].data})
    .then((response) => setHistory(response.items))
    .finally(() => setViagem(0))
  }

  useEffect(() => {
    setHistory(historico);
  }, [modal]);

  useEffect(() => {
    getInicialAddress();
    getFinalAddress().then(() => setLoading(false));
  }, [viagemInicial, viagemFinal]);

  return (
    <Modal visible={visible} animationType='slide' presentationStyle='formSheet'>
      {loading && <Loading />}
      <View topButtons>
        <CloseModal />
      </View>
      <MapView
        initialRegion={{
          latitude: viagemInicial.latitude,
          longitude: viagemInicial.longitude,
          latitudeDelta: 0.0462 * 0.3,
          longitudeDelta: (width / height),
        }}
        loadingEnabled={true}
        loadingIndicatorColor={'#FF9800'}
        showsCompass={true}
        customMapStyle={mapStyle}
        style={{height: getItems2.length > 1 ? '75%' : '80%'}}
        zoomTapEnabled={true}
        minZoomLevel={12.5}
        provider={PROVIDER_GOOGLE}
      >

        <Polyline
          coordinates={tail}
          strokeColor={'#0c71c3'}
          strokeWidth={4}
          lineDashPhase={1}
        />

        <Marker anchor={{x: 0.9, y: 0.9}} coordinate={viagemInicial}>
          <View markerInicial>
            <IconeMC name={'car-connected'} size={25} color={'#ffffff'} />
          </View>
        </Marker>

        <Marker anchor={{x: 0.1, y: 0.1}} coordinate={viagemFinal}>
          <View markerFinal>
            <IconeMC name={'car-connected'} size={25} color={'#ffffff'} />
          </View>
        </Marker>
      </MapView>

      { getItems2.length > 1 && <View changeViagens>
        <ChangeViagem onPress={() => viagem !== 0 && setViagem(viagem - 1)}>
          <IconeArrow name="chevron-left" size={28} color={viagem > 0 ? '#659954' : '#e5fce7'} />
        </ChangeViagem>
        <Text changeViagens>Trocar viagem</Text>
        <ChangeViagem onPress={() => viagem !== getItems2.length - 1 && setViagem(viagem + 1)}>
          <IconeArrow name="chevron-right" size={28} color={getItems2.length - 1 > viagem ? '#659954' : '#e5fce7'} />
        </ChangeViagem>
        </View>
      }

      <View changeData>
        <ChangeViagem onPress={() => currentData !== 0 && getHistory('dayBefore')}>
          <IconeArrow name="chevron-left" size={28} color={currentData !== 0 ? '#0c71c3' : '#b1ddff'} />
        </ChangeViagem>
        <Text changeData>
          {currentData === 0 ? 'Hoje' : currentData === 1 ? 'Ontem' : currentData === 2 ? data[2].data.replaceAll('-', '/') : currentData === 3 ? data[3].data.replaceAll('-', '/') : currentData === 4 ? data[4].data.replaceAll('-', '/') : currentData === 5 ? data[5].data.replaceAll('-', '/') : data[6].data.replaceAll('-', '/')}
        </Text>
        <ChangeViagem onPress={() => currentData < data.length - 1 && getHistory('dayAfter')}>
          <IconeArrow name="chevron-right" size={28} color={currentData < data.length - 1 ? '#0c71c3' : '#b1ddff'} />
        </ChangeViagem>
      </View>

      <View infos>
        {enderecoInicial ? (
          <>
            <Text label>Origem: {viagemInicial.time} - <Text address>{Platform.OS === 'ios' ? enderecoInicial.replaceAll(',', ', ') : enderecoInicial}.</Text></Text>
            <Text label>Destino: {viagemFinal.time} - <Text address>{Platform.OS === 'ios' ? enderecoFinal.replaceAll(',', ', ') : enderecoFinal}.</Text></Text>
        </>) :
          <Text>Sem histórico de viagem</Text>
        }
      </View>
    </Modal>
  )
}

