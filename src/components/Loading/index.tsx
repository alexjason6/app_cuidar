import React from 'react';
import { ActivityIndicator } from 'react-native';

import {Container} from './style';

export default function Loading() {
  return (
    <Container>
      <ActivityIndicator color={'#FF9800'} />
    </Container>
  )
}
