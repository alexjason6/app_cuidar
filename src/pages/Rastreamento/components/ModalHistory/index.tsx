import React, {useContext, useEffect, useState} from "react"
import { Dimensions } from "react-native"
import 'moment/locale/pt-br';
import moment from 'moment';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import IconeMC from 'react-native-vector-icons/MaterialCommunityIcons';

import SmartService from "../../../../services/SmartService";

import TrackContext from '../../../../contexts/rastreamento';
import ModalContext from '../../../../contexts/modalContext';

import mapStyle from '../../mapStyle';
import CloseModal from "../../../../components/FechaModal";

import { Modal, View, Text, ChangeViagem } from "./styles";

export default function ModalHistory({ visible, historico }) {
  const { devices } = useContext(TrackContext);
  const { modal } = useContext(ModalContext);
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const getItems1 = historico.length > 0 ? historico.filter((item: {status: number}) => item.status === 1) : [];
  const getItems2 = historico.length > 0 ? getItems1.map((item) => item.items) : [];
  const [viagem, setViagem] = useState(0);
  const tail = historico.length > 0 ? getItems2[viagem].map((item) => ({latitude: item.lat, longitude: item.lng, speed: item.speed, time: item.device_time})) : [];
  const viagemTotal = tail.length - 1;
  const viagemInicial = tail.length > 0 ? {latitude: tail[0].latitude, longitude: tail[0].longitude, time: tail[0].time} : {latitude: 0, longitude: 0};
  const viagemFinal = tail.length > 0 ? {latitude: tail[viagemTotal].latitude, longitude: tail[viagemTotal].longitude} : {latitude: 0, longitude: 0};
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
  const [dataSelected, setDataSelected ]= useState(moment().format('DD-MM-YYYY'));

  async function getInicialAddress() {
    await SmartService.getAddress({latitude: viagemInicial.latitude, longitude: viagemInicial.longitude})
    .then((response) => setEnderecoInicial(response));
  }

  async function getFinalAddress() {
    await SmartService.getAddress({latitude: viagemFinal.latitude, longitude: viagemFinal.longitude})
    .then((response) => setEnderecoFinal(response));
  }

  useEffect(() => {
    getInicialAddress();
    getFinalAddress();
  }, [viagemInicial, viagemFinal]);

  return (
    <Modal visible={visible} animationType='slide' presentationStyle='formSheet'>
      <View topButtons>
        <CloseModal />
      </View>
      <MapView
        initialRegion={{
          latitude: devices[modal.device].lat,
          longitude: devices[modal.device].lng,
          latitudeDelta: 0.0462 * 0.3,
          longitudeDelta: (width / height),
        }}
          loadingEnabled={true}
          loadingIndicatorColor={'#FF9800'}
          showsCompass={true}
          customMapStyle={mapStyle}
          style={{height: '80%'}}
          zoomTapEnabled={true}
          minZoomLevel={12.5}
          provider={PROVIDER_GOOGLE}>

      <Polyline
        coordinates={tail}
        strokeColor="#0c71c3"
        strokeWidth={4}
        lineDashPhase={1}
      />

      <Marker coordinate={viagemInicial}>
        <View style={{backgroundColor: '#ff9800', width: 50, height: 50}}>
          <IconeMC name={'car-connected'} size={25} color={'#0c71c3'} />
        </View>
      </Marker>

      <Marker coordinate={viagemFinal}>
        <View style={{backgroundColor: '#ff9800', width: 50, height: 50}}>
          <IconeMC name={'car-connected'} size={25} color={'#0c71c3'} />
        </View>
      </Marker>
    </MapView>
    <View infos>
      <Text>{enderecoInicial}</Text>
      <Text>{enderecoFinal}</Text>
        {viagem !== viagemTotal &&
          <ChangeViagem onPress={() => setViagem(viagem + 1)}>
            <Text>Proxima viagem</Text>
          </ChangeViagem>
        }
        {viagem !== 0 &&
          <ChangeViagem onPress={() => setViagem(viagem -1)}>
            <Text>Viagem anterior</Text>
          </ChangeViagem>
        }
    </View>

          {/* <ScrollView style={styles.containerData} horizontal={true}>
            {data.map((item, index) => {
              return (
                <TouchableOpacity
                  style={dataSelected === item.data ?
                    styles.botaoDatasSelected :
                    styles.botaoDatas}
                  key={index}
                  onPressIn={() => setDataSelected(item.data)}
                  onPressOut={() => getHistory(equipamento)}
                  >
                    {item.data === moment().format('DD-MM-YYYY') ?
                    <Text
                      style={dataSelected === item.data ?
                        styles.datasSelected :
                        styles.datas}>Hoje</Text> :
                        item.data === moment().subtract(1, 'days').format('DD-MM-YYYY') ?
                        <Text
                          style={dataSelected === item.data ?
                          styles.datasSelected :
                          styles.datas}>Ontem</Text> :
                          <Text
                            style={dataSelected === item.data ?
                            styles.datasSelected :
                            styles.datas}>{item.data}</Text>}
                </TouchableOpacity>
              )
            })}
          </ScrollView> */}
        </Modal>
  )
}

