import React, { useContext, useEffect, useState } from "react";
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import IconeMC from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import 'moment/locale/pt-br';
import moment from 'moment';

import SmartService from "../../../../services/SmartService";
import TrackerContext from '../../../../contexts/rastreamento';
import ModalContext from "../../../../contexts/modalContext";

import CloseModal from '../../../../components/FechaModal';
import mapStyle from '../../mapStyle';
import { ButtonHistory } from '../ButtonHistory/ButtonHistory';
import Infos from './../../components/Infos';

import { Container, View, ChangeDevice, Text } from './styles';

export default function ModalMap({visible}) {
  const { devices } = useContext(TrackerContext);
  const { modal, changeModal } = useContext(ModalContext);
  const [endereco, setEndereco] = useState('');
  const tail = devices[modal.device].tail.map((item: {lat: number, lng: number}) => ({latitude: Number(item.lat), longitude: Number(item.lng)}));


  async function handleChangeDevice(direction: string) {
    if (direction === 'minus') {
      changeModal({modalName: 'modalMap', active: true, device: modal.device - 1});
    }

    if (direction === 'plus') {
      changeModal({modalName: 'modalMap', active: true, device: modal.device + 1});
    }
  }

  async function getAddress() {
    await SmartService.getAddress({latitude: devices[modal.device].lat, longitude: devices[modal.device].lng})
    .then((response) => setEndereco(response))
  }

  useEffect(() => {
    getAddress();
  }, [modal.device])

  return (
    <Container visible={visible} presentationStyle={'formSheet'} animationType="slide">
      <View topButtons>
        <ButtonHistory>
          <IconeMC name={'format-list-bulleted'} size={20} color={'#ff9800'} />
        </ButtonHistory>

        <CloseModal />
      </View>
      <MapView
        region={{
          latitude: devices[modal.device].lat,
          longitude:  devices[modal.device].lng,
          latitudeDelta: 0.0462 * 0.3,
          longitudeDelta: 0.0261 * 0.3,
        }}
        loadingEnabled={true}
        loadingIndicatorColor={'#FF9800'}
        showsCompass={true}
        customMapStyle={mapStyle}
        zoomControlEnabled={true}
        style={{height: devices.length > 1 ? '75%' : '80%'}}
        zoomTapEnabled={true}
        minZoomLevel={1.5}
        provider={PROVIDER_GOOGLE}
        >
          <Polyline
            coordinates={tail}
            strokeColor={devices[modal.device].online === 'online'? "#0c71c3" : "#999999"}
            strokeWidth={4}
          />
          <Marker centerOffset={{x: 0, y: 0}} coordinate={{ latitude: devices[modal.device].lat, longitude: devices[modal.device].lng }}>
            <View marker>
              <IconeMC name={'car-connected'} size={25} color={devices[modal.device].online === 'online' ? '#40C351' : '#ffffff'} />
            </View>
          </Marker>

      </MapView>
      { devices.length > 1 && (
        <View changeDevice>
          <ChangeDevice minus onPress={() => modal.device > 0 && handleChangeDevice('minus')}>
            <Icon name={'arrow-left'} size={28} color={modal.device > 0 ? '#659954' : '#e5fce7'} />
          </ChangeDevice>
          <Text>Trocar veículo</Text>
          <ChangeDevice plus onPress={() => devices.length -1 !== modal.device && handleChangeDevice('plus')}>
            <Icon name={'arrow-right'} size={28} color={devices.length -1 !== modal.device ? '#659954' : '#e5fce7'} />
          </ChangeDevice>
        </View>
      )}
      <Infos
        deviceName={devices[modal.device].name.split(' ')[0]}
        colorIconDevice={devices[modal.device].online === 'online' ? '#ff9800' : '#cccccc'}
        ignition={devices[modal.device].online === 'online' ? 'Ligado' : 'Desligado'}
        colorIconIgnition={devices[modal.device].online === 'online' ? '#0c71c3' : '#cccccc'}
        speed={`${devices[modal.device].speed} km/h`}
        timeStoped={devices[modal.device].stop_duration}
        address={endereco}
        refreshAt={moment.unix(devices[modal.device].timestamp).locale('pt-br').fromNow()}
      />
    </Container>
  )


}
