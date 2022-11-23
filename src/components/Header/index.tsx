import React from "react";

import CloseModal from '../FechaModal';

import {Container, Text} from './styles';

export default function Header({title, description, children, closeButton, modalBoleto, whiteColor}) {

  return (
    <Container modalBoleto={modalBoleto} whiteColor={whiteColor}>
      {closeButton && <CloseModal />}
      {title && <Text title whiteColor={whiteColor}>{title}</Text>}
      {description && <Text description whiteColor={whiteColor}>{description}</Text>}
      {children}
    </Container>
  )
}
