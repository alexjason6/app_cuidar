import React, {useContext} from "react";

import ModalContext from '../../contexts/modalContext';

import {Container, Image, TouchableOpacity} from './styles';

export default function CloseModal() {
  const {changeModal} = useContext(ModalContext);
  return (
    <Container>
      <TouchableOpacity onPress={() => changeModal({modalName: '', active: false, device: 0})}>
        <Image source={require('../../imagens/close.png')}/>
      </TouchableOpacity>
    </Container>
  )
}
