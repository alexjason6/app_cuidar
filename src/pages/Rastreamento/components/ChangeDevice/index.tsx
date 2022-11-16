import React, { useContext } from "react";
import Icon from 'react-native-vector-icons/Feather';

import ModalContext from '../../../../contexts/modalContext';
import TrackContext from "../../../../contexts/rastreamento";

import { Container, View } from "./styles";

export default function({equipamento}) {
  const { modal, changeModal } = useContext(ModalContext);
  const { devices } = useContext(TrackContext);

  return (
    <Container>
      <View onPress={changeModal({modalName: 'modalMap', active: true, device: equipamento})}>
        {equipamento > 0 && <Icon name={'arrow-left'} size={28} color={'#0c71c3'} />}
        {devices.length === equipamento ? null : <Icon name={'arrow-right'} size={28} color={'#0c71c3'} />}
      </View>
    </Container>
  )
}
