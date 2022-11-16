import React, { Children, useContext, useEffect, useState } from "react";
import moment from 'moment';
import IconeMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIon from 'react-native-vector-icons/Ionicons';

import ModalContext from "../../../../contexts/modalContext";

import SmartService from "../../../../services/SmartService";

import { Button } from '../../../../components/Button';

import {Container, View, Text } from './styles'

export default function Card({device, children, equipamento}) {
  const { changeModal } = useContext(ModalContext);
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
        {device.online === 'online' ? (
          <Text ligado>
            <IconeMC name="engine" size={20} color={'#0c71c3'} />{' '}
            Ligado
          </Text>
        ) : (
          <Text desligado>
            <IconeMC name="engine" size={20} color={'#cccccc'} />
            {'  '}
            Desligado
          </Text>
        )}
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
        {endereco.replaceAll(',', ', ')}
      </Text>
      {children}   
    </Container>
  )
}
