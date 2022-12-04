import React from "react";
import { Platform } from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconeMC from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, Text, View } from "./styles";

export default function Infos({deviceName, colorIconDevice, ignition, colorIconIgnition, speed, timeStoped, address, refreshAt}) {

  return (
    <Container>
      <View deviceName>
        <Text placa ligado={ignition === 'Ligado' && true} desligado={ignition !== 'Ligado' && true} >
          <IconeMC name={'car-connected'} size={20} color={colorIconDevice} /> {deviceName}
        </Text>
        <Text ignition>
          <IconeMC name="engine" size={20} color={colorIconIgnition} /> {ignition}
        </Text>
      </View>
      <View>
        <Text speed>
          <IconIon name="speedometer" size={20} color={'#cccccc'} /> {speed}
        </Text>
        {ignition === 'Desligado' && <Text stoped>
          <IconEntypo name={'stopwatch'} size={20} color={'#cccccc'} /> Duração da parada: {timeStoped}
        </Text>}
      </View>
      <View address>
        <IconEntypo name="address" size={20} color={'#cccccc'} />
        <Text address> {Platform.OS === 'ios' ? address.replaceAll(',', ', ') : address}.</Text>
      </View>
      <Text refresh>
        Atualizado {refreshAt}.
      </Text>
    </Container>
  );
}
