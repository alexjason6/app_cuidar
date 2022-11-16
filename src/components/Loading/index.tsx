import React from 'react';
import {
  View,
  ActivityIndicator,

} from 'react-native';

import styles from './style';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={'#FF9800'} />
    </View>
  )
}