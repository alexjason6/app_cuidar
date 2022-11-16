import React, {useState} from "react"
import { Dimensions } from "react-native"
import 'moment/locale/pt-br';
import moment from 'moment';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import IconeMC from 'react-native-vector-icons/MaterialCommunityIcons';

import mapStyle from '../../mapStyle';

import { Modal, View, Text } from "./styles"
import CloseModal from "../../../../components/FechaModal";

export default function ModalHistory({ visible, equipamento, historico }) {
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const [deviceHistory, setDeviceHistory] = useState([]);
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
  const [dataSelected, setDataSelected ]= useState(moment().format('DD-MM-YYYY'));

  const teste1 = historico.map((item) => item.items.map((item1) => item1));
  const teste2 = teste1.flatMap((item) => item);
  const tail = teste2.map((item) => ({latitude: item.latitude, longitude: item.longitude, speed: item.speed}))

  console.log()

  return (
    <Modal visible={visible} animationType='slide' presentationStyle='formSheet'>
      <MapView
        initialRegion={{
          latitude: equipamento.lat,
          longitude: equipamento.lng,
          latitudeDelta: 0.0462 * 0.3,
          longitudeDelta: (width / height),
        }}
          loadingEnabled={true}
          loadingIndicatorColor={'#FF9800'}
          showsCompass={true}
          customMapStyle={mapStyle}
          style={{height: '100%'}}
          zoomTapEnabled={true}
          minZoomLevel={12}
          provider={PROVIDER_GOOGLE}>

      <Polyline
        coordinates={tail}
        strokeColor="#0c71c3"
        strokeWidth={4}
        lineDashPhase={1}
      />

      <CloseModal />
          {

            tail.map((item, index) => {
              return (
                <View>
                <Marker coordinate={
                {
                  latitude: item.lat,
                  longitude: item.lng
                }
                }
                key={index}>
                  <View style={{backgroundColor: '#ff9800', width: 20, height: 20}}>
                    <IconeMC name={'car-connected'} size={25} color={'#0c71c3'} />
                    <Text>{item.speed} km/h</Text>
                  </View>
                </Marker>
                </View>
              )
            })}
          </MapView>
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

