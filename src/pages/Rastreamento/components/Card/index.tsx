import React, { useEffect, useState } from "react";
import {Platform} from 'react-native';
import moment from 'moment';
import IconeMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIon from 'react-native-vector-icons/Ionicons';

import SmartService from "../../../../services/SmartService";

import {Container, View, Text } from './styles'

export default function Card({device, children}) {
  const [endereco, setEndereco] = useState('');

  async function getAddress() {
    await SmartService.getAddress({latitude: device.lat, longitude: device.lng})
    .then((response) => setEndereco(response))
  }

  useEffect(() => {
    getAddress();
  }, [device])

  return (
    <Container>
      <View placa
        style={{
          justifyContent: 'space-between',
          aligns: 'center',
          flexDirection: 'row',
        }}>
        <Text placa>
          <IconeMC name={'car-connected'} size={20} /> {device.name}
        </Text>

        <Text ligado={device.online === 'online'} desligado={device.online !== 'online'}>
          <IconeMC name="engine" size={20} color={device.online === 'online' ? '#0c71c3' : '#cccccc'} />{device.online === 'online' ? ' Ligado' : ' Desligado'}
        </Text>

      </View>
      <View speed>
        <Text speed>
          <IconIon name="speedometer" size={20} color={'#cccccc'} />
          {'  '}
          {device.speed} km/h
        </Text>
        <Text time>
          Atualizado {moment.unix(device.timestamp).locale('pt-br').fromNow()}
        </Text>
      </View>
      <Text address>
        {Platform.OS === 'ios' ? endereco.replaceAll(',', ', ') : endereco}
      </Text>
      {children}
    </Container>
  )
}
