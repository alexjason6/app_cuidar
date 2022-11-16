import React from "react";
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import IconeMC from 'react-native-vector-icons/MaterialCommunityIcons';

import CloseModal from '../../../../components/FechaModal'
import mapStyle from '../../mapStyle';
import { ButtonHistory } from '../ButtonHistory/ButtonHistory';

import { Container, View } from './styles';

export default function ModalMap({children, equipamento, visible}) {
 const tail = equipamento.tail.map((item) => ({latitude: Number(item.lat), longitude: Number(item.lng)}));

  return (
    <Container visible={visible} presentationStyle={'formSheet'} animationType="slide">
      <MapView
        region={{
          latitude: equipamento.lat,
          longitude: equipamento.lng,
          latitudeDelta: 0.0462 * 0.3,
          longitudeDelta: 0.0261 * 0.3,
        }}
        loadingEnabled={true}
        loadingIndicatorColor={'#FF9800'}
        showsCompass={true}
        customMapStyle={mapStyle}
        zoomControlEnabled={true}
        style={{height: '100%'}}
        zoomTapEnabled={true}
        minZoomLevel={1.5}
        provider={PROVIDER_GOOGLE}
        >

          <Polyline 
            coordinates={tail}
            strokeColor={equipamento.online === 'online'? "#0c71c3" : "#999999"}
            strokeWidth={4}
          />
          <Marker centerOffset={{x: 0, y: 0}} coordinate={{ latitude: equipamento.lat, longitude: equipamento.lng }}>
            <View marker>
              <IconeMC name={'car-connected'} size={25} color={equipamento.online === 'online' ? '#40C351' : '#ffffff'} />
            </View>
          </Marker>

          <View topButtons>
            <ButtonHistory>
              <IconeMC name={'format-list-bulleted'} size={20} color={'#ff9800'} />
            </ButtonHistory>

            <CloseModal />
          </View>

          {children}
        
        </MapView>
{/*         <View style={styles.btnOpenHistory}>
        <TouchableOpacity
            style={[styles.openHistory]}
            onPressIn={() => setDataSelected(data[0].data)}
            onPressOut={() => getHistory(equipamento)}>
          <Icon name="list" size={20} color={'#0c71c3'} />
          </TouchableOpacity>
        </View>     */}  
    </Container>
  )


}
