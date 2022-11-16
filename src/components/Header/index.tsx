import React from "react";

import CloseModal from '../FechaModal';

import {Container, Text} from './styles'; 

export default function Header({title, description, children, closeButton, modalBoleto}) {

  return (
    <Container modalBoleto={modalBoleto}>
      {closeButton && <CloseModal />}
      {title && <Text title>{title}</Text>}
      {description && <Text description>{description}</Text>}
      {children}
    </Container>
  )
}
