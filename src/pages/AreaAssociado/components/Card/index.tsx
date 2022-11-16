import React from 'react';

import {Container, Title} from './styles';

export default function Card({children, title}) {
  return (
    <Container>
      <Title>
        {title}
      </Title>
      {children}
    </Container>
  )
}